import React from 'react'
import './loader.scss'
const Loader = ({ isActive }) => {
    return (
        isActive &&
        <>
            <div className='spinner-overlay'>
            </div>
            <div className="spinner">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default Loader