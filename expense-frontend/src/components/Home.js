import React, { useState, useEffect } from 'react'
import ExpenseTable from './ExpenseTable'
import { useSelector, useDispatch } from 'react-redux'
import DonutChart from 'react-donut-chart'
import { Chart } from 'react-google-charts'
import { asyncAddExpense, asyncEditExpense, asyncGetExpenses, asyncRemoveExpense } from '../action/expenseAction'
import { asyncGetCategories } from '../action/categoryAction'
import { asyncGetBudget } from '../action/budgetAction'

const Home = (props) => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [expenseDate, setExpenseDate] = useState('')
    const [category, setCategory] = useState('')
    const [expId, setExpId] = useState('')
    const [isSaved, setIsSaved] = useState(false)

    const dispatch = useDispatch()

    const data = {
        name,
        amount,
        description,
        expenseDate,
        categoryId: category
    }

    const handleSaveExpense = (e) => {
        e.preventDefault()
        dispatch(asyncAddExpense(data))
        setIsSaved(true)
    }

    useEffect(() => {
        dispatch(asyncGetCategories())
        dispatch(asyncGetExpenses())
        dispatch(asyncGetBudget())
    }, [dispatch])

    const categoriesData = useSelector((state) => {
        return state.categories
    })

    const expensesData = useSelector((state) => {
        return state.expenses
    })

    const budgetData = useSelector((state) => {
        return state.budget
    })

    //Donut Chart Data

    const values = expensesData.reduce((a, b) => (a + b.amount), 0)
    const total = budgetData.amount
    const percentage = ((values) / (total) * 100)

    const handleRemove = (id) => {
        const confirmRemove = window.confirm('Are you sure?')
        if (confirmRemove) {
            dispatch(asyncRemoveExpense(id))
        }

    }


    const handleEdit = (id) => {
        const data = expensesData.find((ele) => ele._id == id)
        setName(data.name)
        setAmount(data.amount)
        setDescription(data.description)
        setExpenseDate(data.expenseDate)
        setExpId(data._id)

    }

    const handleUpdateExpense = () => {
        dispatch(asyncEditExpense(expId, data))
        setIsSaved(true)
    }

    //Pie Chart Data
    const categoriesExpenses = expensesData.reduce((groups, expense) => {
        const category = expense.categoryId
        if (!groups[category]) {
            groups[category] = []
        }
        groups[category].push(expense)
        return groups
    }, {})

    const chartData = [
        ['Category', 'amount']
    ]

    Object.entries(categoriesExpenses).map(([category, expenses]) => {
        chartData.push([String(categoriesData.filter((cat) => cat._id === category).map(ele => ele.name)), expenses.reduce((a, b) => (a + Number(b.amount)), 0)])
    })

    useEffect(() => {
        if (isSaved) {
            setName('')
            setAmount('')
            setDescription('')
            setExpenseDate('')
            setCategory('')
        }
    }, [isSaved])





    return (
        <div className='row mt-5'>
            <div className='col-md-12 d-flex justify-content-center mt-5'>
                <div className="card text-center" style={{ width: '75rem' }}>
                    <div className="card-header">
                        <h4>Expense Page</h4>
                    </div>
                    <div className="card-body">
                        <div className='d-flex justify-content-around'>
                            <div className="card ms-5" style={{ width: '25rem' }}>
                                <div className="card-header">
                                    Budget Overview
                                </div>
                                <div className="card-body">
                                    <DonutChart
                                        data={[
                                            {
                                                value: percentage,
                                                label: 'expense'
                                            },
                                            {
                                                label: 'budget',
                                                value: 100,
                                                isEmpty: false
                                            }
                                        ]}
                                        height={200}
                                        width={300}
                                        innerRadius={0.5}
                                        outerRadius={0.8}
                                        colors={['#607d8b']}
                                        formatValues={(percentage) => `${(percentage).toFixed(2)}%`}
                                    />
                                    <div className='d-flex justify-content-left mt-2 ms-2'>
                                        <p className="card-text fs-4">total budget Rs.{total}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="card me-5" style={{ width: '25rem' }}>
                                <div className="card-header">
                                    Category wise split-up
                                </div>
                                <div className="card-body">
                                    <div className='card-title me-5'>
                                        {
                                            categoriesData.length < 5 ? (
                                                <Chart
                                                    width={'380px'}
                                                    height={'300px'}
                                                    chartType="PieChart"
                                                    loader={<div>Loading Chart</div>}
                                                    data={chartData}
                                                    options={{
                                                        pieHole: 0.4,
                                                    }}
                                                />
                                            ) : (
                                                <div className='row ms-4'>
                                                    <div className='mt-3 table-wrapper-scroll-y my-custom-scrollbar'>
                                                        <table className='table table-bordered table-hover table-striped mb-0'>
                                                            <thead className='table-dark thead-light thead-fixed'>
                                                                <tr>
                                                                    <th>Category Name</th>
                                                                    <th>Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Object.entries(categoriesExpenses).map(([category, expenses]) => (
                                                                    <tr key={category}>
                                                                        <td>{categoriesData.filter((cat) => cat._id === category).map(ele => ele.name)}</td>
                                                                        <td>{expenses.reduce((a, b) => (a + Number(b.amount)), 0)}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="modal fade" id="expenseModal" aria-labelledby="expenseModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="expenseModalLabel">Expense</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div style={{ width: '28rem' }}>
                                            <div className='mt-2'>
                                                <label className='d-flex justify-content-left'>Name:</label>
                                                <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className='mt-2'>
                                                <label className='d-flex justify-content-left'>Amount:</label>
                                                <input className='form-control' type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                            </div>
                                            <div className='mt-2'>
                                                <label className='d-flex justify-content-left'>Description:</label>
                                                <input className='form-control' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                            <div className='mt-2'>
                                                <label className='d-flex justify-content-left'>Date:</label>
                                                <input className='form-control' type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
                                            </div>
                                            <div className='mt-2'>
                                                <div className='d-flex justify-content-left mt-2'>
                                                    <label>Category:</label>
                                                    <select className='ms-2' value={category} onChange={(e) => setCategory(e.target.value)}>
                                                        <option value="">select category</option>
                                                        {
                                                            categoriesData.map((category) => {
                                                                return <option key={category._id} value={category._id}>{category.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveExpense}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="editModalLabel">Modal title</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div style={{ width: '28rem' }}>
                                            <div className='mt-2'>
                                                <label className='d-flex justify-content-left'>Name:</label>
                                                <input className='form-control' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className='d-flex justify-content-left'>Amount:</label>
                                                <input className='form-control' type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className='d-flex justify-content-left'>Description:</label>
                                                <input className='form-control' type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className='d-flex justify-content-left'>Date:</label>
                                                <input className='form-control' type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} />
                                            </div>
                                            <div className='mt-2'>
                                                <div className='d-flex justify-content-left mt-2' >
                                                    <label>Category:</label>
                                                    <select className='ms-2' value={category} onChange={(e) => setCategory(e.target.value)}>
                                                        <option value="">select category</option>
                                                        {
                                                            categoriesData.map(category => {
                                                                return <option key={category._id} value={category._id}>{category.name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleUpdateExpense}>Update</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ExpenseTable categoriesData={categoriesData} expensesData={expensesData} handleRemove={handleRemove} handleEdit={handleEdit} />
                </div>
            </div>
        </div>
    )
}

export default Home