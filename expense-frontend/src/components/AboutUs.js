import React from 'react'

const AboutUs = (props) => {
    return (
        <div className='row mt-5'>
            <div className='col-md-9 d-flex justify-content-center mt-5'>
                <div className="card text-center">
                    <div className="card-header">
                        <h3> About us </h3>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Expense Management App</h5>
                        <p className="card-text">
                            Expense management app involves the process of tracking, analyzing, and controlling expenses within an organization or individual.
                        </p>
                        <div className="card-text" style={{ textAlign: 'left', margin: '20px' }}>
                            <li> This app track all your expenses: Record all expenses, including small ones, as they add up over time.</li>
                            <li> Categorize expenses into different categories such as travel, food, entertainment, etc., to better understand where your money is going. </li>
                            <li>
                                Review your expenses regularly to identify areas where you can cut back or reduce costs. For example, you may realize that you are overspending on dining out, and you can adjust your budget accordingly.
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs