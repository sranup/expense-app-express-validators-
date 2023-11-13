import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetBudget, asyncUpdateBugdet } from '../action/budgetAction'
import { asyncAddCategory, asyncGetCategories, asyncRemoveCategory } from '../action/categoryAction'
import swal from 'sweetalert'

const Settings = (props) => {
    const [budget, setBudget] = useState('')
    const [category, setCategory] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetBudget())
        dispatch(asyncGetCategories())
    }, [dispatch])

    const budgetStore = useSelector((state) => {
        return state.budget
    })

    console.log('budgetStore', budgetStore)

    const categoryStore = useSelector((state) => {
        return state.categories
    })






    const handleBudget = (e) => {
        e.preventDefault()

        const budgetData = {
            amount: Number(budget)
        }
        console.log('budgetData', budgetStore)
        
            dispatch(asyncUpdateBugdet(budgetStore._id, budgetData))
            setBudget('')

    }

    const handleCategory = (e) => {
        e.preventDefault()
        const categoryData = {
            name: category
        }
        if (category.length !== 0) {
            dispatch(asyncAddCategory(categoryData))
            setCategory('')
        } else {
            swal('enter category')
        }

    }

    const handleRemove = (id) => {
        const confirmRemove = window.confirm('Are you sure?')
        if (confirmRemove) {
            dispatch(asyncRemoveCategory(id))
        }

    }

    return (
        <div className='row mt-5'>
            <div className='col-md-12 d-flex justify-content-center mt-5'>
                <div className="card text-center" style={{ width: '40rem' }}>
                    <div className="card-header">
                        <h3>Budget and Category</h3>
                    </div>
                    <div className="card-body d-flex justify-content-center">
                        <div className='card-title'>
                            <form onSubmit={handleBudget} style={{ width: '22rem' }}>
                                <div className='d-flex justify-content-center'>
                                    <h5>Budget - {budgetStore.amount}</h5>

                                </div>
                                <div className='mt-2'>
                                    <input className='form-control' type="text" value={budget} onChange={(e) => {
                                        setBudget(e.target.value)
                                    }} />
                                </div>
                                <div className='mt-2'>
                                    <input className='btn btn-success' type="submit" value="update" />
                                </div>
                            </form>
                            <form className="mt-3" onSubmit={handleCategory} style={{ width: '22rem' }}>
                                <div>
                                    <h5>List Category</h5>
                                </div>
                                <div className='mt-2'>
                                    <input className='form-control' type="text" value={category} onChange={(e) => {
                                        setCategory(e.target.value)
                                    }} />
                                </div >
                                <div className='mt-2'>
                                    <input className='btn btn-success' type="submit" value="add" />
                                </div>
                            </form>
                            <div className='mt-2'>
                                <div >
                                    <h5>Category List - {categoryStore.length}</h5>
                                </div>
                                <div className='mt-3 table-wrapper-scroll-y my-custom-scrollbar'>
                                    <table className='table table-bordered table-hover table-striped mb-0'>
                                        <thead className='table-dark thead-light thead-fixed'>
                                            <tr>
                                                <th>Item</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoryStore.map((category) => {
                                                return (
                                                    <tr key={category._id}>
                                                        <td>{category.name}</td>
                                                        <td><button onClick={() => {
                                                            handleRemove(category._id)
                                                        }} className='btn btn-danger'></button></td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings