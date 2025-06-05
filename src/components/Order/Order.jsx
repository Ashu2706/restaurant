import React, { useEffect } from 'react'
import './Order.scss'
import LoginMessage from '../LoginMessage/LoginMessage';
const Order = ({ isSidebarOpen, setIsSidebarOpen }) => {
    // Sample orders data
    const orders = [
        { id: 1, name: "Saag (Spinach) with Makki di Roti", price: 40, quantity: 2 },
        { id: 2, name: "Blueberry Banana Smoothie", price: 35, quantity: 1 },
        { id: 3, name: "South Indian Masala Dosa", price: 5, quantity: 3 },
    ];

    return (
        <>
            <div className={`order-overlay ${isSidebarOpen ? "show" : ""}`}
                onClick={() => setIsSidebarOpen(false)}
            >
            </div>
            {/* Sidebar */}
            <div className={`order-sidebar ${isSidebarOpen ? "show" : ""}`}>
                <div className="order-sidebar-header">
                    <h5 className="text-primary">Your Orders</h5>
                    <button
                        className="btn-close"
                        onClick={() => setIsSidebarOpen(false)}
                    ></button>
                </div>
                <div className="order-sidebar-body">
                    <ul className="list-group">
                        {orders.map((order) => (
                            <li
                                key={order.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <h6>{order.name}</h6>
                                    <p className="mb-1">Price: <span className="ms-1 d-inline-block text-primary">₹{order.price}</span></p>
                                    <p className="mb-1">Quantity: <span className="ms-1 text-primary">{order.quantity}</span></p>
                                    <p className="mb-1">Total Amount: <span className="ms-1 text-primary">₹{order.price * order.quantity}</span></p>

                                    <p className="text-success fw-bold">Successful</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Order