import React, { useState } from 'react'
import axios from 'axios'
import PaginationComponent from './Pagination'
import { useDispatch } from 'react-redux'
import { asyncGetExpenses } from '../action/expenseAction'



const ExpenseTable = (props) => {
    const { expensesData, categoriesData, handleRemove, handleEdit } = props

    const [input, setInput] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(3)
    const [deletedExpenses, setDeletedExpenses] = useState([])

    const dispatch = useDispatch()

    const handleExpenseEdit = (id) => {
        handleEdit(id)

    }

    const showDeletedExpenses = () => {
        axios.get('http://localhost:3100/user/deletedExpenses', {
            headers: {
                'Authorization': localStorage.getItem('token')

            }
        })
            .then((response) => {
                const deletedData = response.data
                if (deletedData.hasOwnProperty('errors')) {
                    alert(deletedData.message)
                } else {
                    setDeletedExpenses(deletedData)
                }
            })
            .catch((err) => {
                alert(err.message)
            })


    }

    const handleExpenseRemove = (id) => {
        handleRemove(id)

    }

    const handleRestore = (id) => {
        axios.get(`http://localhost:3100/user/restoreExpenses/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const restoredData = response.data
                const filteredData = deletedExpenses.filter((ele) => ele._id !== restoredData._id)
                if (restoredData.hasOwnProperty('errors')) {
                    alert(restoredData.message)
                } else {
                    setDeletedExpenses(filteredData)
                    dispatch(asyncGetExpenses())
                }
            })
            .catch((err) => {
                alert(err.message)
            })


    }

    const handleHardDelete = (id) => {
        axios.delete(`http://localhost:3100/user/permanentDeleteExpense/${id}`, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const deletedData = response.data
                const filteredData = deletedExpenses.filter((ele) => ele._id !== deletedData._id)
                if (deletedData.hasOwnProperty('errors')) {
                    alert(deletedData.message)
                } else {
                    setDeletedExpenses(filteredData)
                }
            })
            .catch((err) => {
                alert(err.message)
            })

    }

    const handlePageChange = (page) => {
        setCurrentPage(page)

    }

    //Pagination Calculation
    const totalPages = expensesData.length / itemsPerPage
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = expensesData.slice(indexOfFirstItem, indexOfLastItem)

    return (
        <div>
            <div className='d-flex mb-3'>
                <button type="button" className="btn btn-primary ms-2 p-2" data-bs-toggle="modal" data-bs-target="#expenseModal" style={{ width: '10rem' }}>
                    Add expense
                </button>
                <button type="button" className='btn btn-secondary p-2 ms-2' data-bs-toggle="modal" data-bs-target="#deletedExpenseModal" onClick={showDeletedExpenses}>Show Deleted Expense</button>
                <input className='form-control ms-auto p-2 me-2' type="text" placeholder="search" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <div class="modal fade" id="deletedExpenseModal" tabindex="-1" aria-labelledby="deletedExpenseModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="deletedExpenseModalLabel">Deleted Expenses</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className='mt-3 table-wrapper-scroll-y my-custom-scrollbar'>
                                {deletedExpenses.length == 0 ? (
                                    <h4 className='d-flex justify-content-center'>deleted records not found</h4>
                                ) : (
                                    <table>
                                        <thead className='table-dark thead-light thead-fixed'>
                                            <tr>
                                                <th>Expense Name</th>
                                                <th>Amount</th>
                                                <th>Deleted Time</th>
                                                <th>Restore</th>
                                                <th>Delete Permanantly</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                deletedExpenses.map((data) => {
                                                    return (
                                                        <tr key={data._id}>
                                                            <td>{data.name}</td>
                                                            <td>{data.amount}</td>
                                                            <td>{(data.updatedAt).slice(0, 10)}</td>
                                                            <td>{(data.updatedAt).slice(11, 19)}</td>
                                                            <td><button className='btn btn-success' onClick={() => handleRestore(data._id)}>Restore</button></td>
                                                            <td><button className='btn btn-success' onClick={() => handleHardDelete(data._id)}>Delete</button></td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                )
                                }

                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                {
                    expensesData.length == 0 ? (
                        <h3 className='d-flex justify-content-center'>No expenses found. Add your first expense</h3>
                    ) : (
                        <table className='table table-bordered table-hover table-striped mb-0'>
                            <thead className="table-dark thead-light thead-fixed">
                                <tr>
                                    <th>Edit</th>
                                    <th>Category</th>
                                    <th>Item Name</th>
                                    <th>Amount</th>
                                    <th>Expense Date</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.filter((ele) => (ele.name.toLowerCase().includes(input))).map((exp) => {
                                        return (
                                            <tr key={exp._id}>
                                                <td><button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { handleExpenseEdit(exp._id) }}>edit</button></td>
                                                <td>{categoriesData.filter((ele) => ele._id == exp.categoryId).map((cat) => cat.name)}</td>
                                                <td>{exp.name}</td>
                                                <td>{exp.amount}</td>
                                                <td>{(exp.expenseDate).slice(0, 10)}</td>
                                                <td><button className='btn btn-danger' onClick={() => handleExpenseRemove(exp._id)}>remove</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )
                }

            </div>
            <div class="card-title d-flex justify-content-end mt-3">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default ExpenseTable