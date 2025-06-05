import React, { useContext, useEffect, useState } from "react";
import "./addToCart.scss";
import fetchCart from "../../api/fetchCart";
import { AuthContext, CartContext } from "../../App";
import updateCart from "../../api/updateCart";
import deleteCartItem from "../../api/deleteCartItem";
import { Bounce, toast } from "react-toastify";

const AddToCart = () => {
    const { cart, setCart } = useContext(CartContext);;
    // Sample cart items
    // const [cartItems, setCartItems] = useState();

    // Increase quantity
    const increaseQuantity = (id) => {

        cart.forEach(async (item) => {
            if (item.id === id && item.quantity < 5) { //item.quantity < item.maxQuantity
                const updatedCartItem = await updateCart({ ...item, quantity: item.quantity + 1 });

                if (updatedCartItem) //if carts get updated and does not return null or throw error because of issue
                {
                    // const newCart = await fetchCart(); //unnecessary load on the server for multiplefrequent requests and slow down the performance
                    //     if(newCart)
                    //         setCart(newCart);

                    setCart((prevItems) => //prevItem represent cart state here
                        prevItems.map((item) => //return modified array that will updata the cart State
                            item.id === updatedCartItem.id ? updatedCartItem : item
                        )
                    );
                }
                // console.log("Response:", updatedCartItem);
            }
            else if (item.id === id && item.quantity === 5) {
                toast.warning("Maximum quantity reached", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                    transition: Bounce
                });
            }
        });
    };
    // Decrease quantity
    const decreaseQuantity = (id) => {
        cart.forEach(async (item) => {
            if (item.id === id) {

                if (item.quantity === 1) { //item.quantity > item.minQuantity && it should not be hit for 1 as it will allow the quantity to go 0
                    console.log(item);
                    const deletedItem = await deleteCartItem(item.id);
                    if (deletedItem) {
                        // const newCart = await fetchCart();//unnecessary load on the server for multiplefrequent requests and slow down the performance
                        // if(newCart)
                        //     setCart(newCart);

                        setCart((prevItems) => //prevItem represent cart state here
                            prevItems.filter((item) => item.id !== id) //keep only items that do not match the id of item being deleted
                        );
                    }

                    return; //to stop the function and the following lines from executing
                }

                const updatedCartItem = await updateCart({ ...item, quantity: item.quantity - 1 });

                if (updatedCartItem) //if carts get updated and does not return null or throw error because of issue
                {
                    // const newCart = await fetchCart(); //unnecessary load on the server for multiplefrequent requests and slow down the performance
                    //     if(newCart)
                    //         setCart(newCart);

                    // here we are using hybrid approach
                    // Since you're already fetching the cart data at key moments (on first load or reload), you can rely on local state updates 
                    // for immediate feedback during runtime without worrying too much about inconsistencies.

                    setCart((prevItems) => //prevItem represent cart state here
                        prevItems.map((item) => //return modified array that will updata the cart State
                            item.id === updatedCartItem.id ? updatedCartItem : item
                        )
                    );
                }

                // console.log("Response: ", updatedCartItem);
            }
        });
    };

    /*On first load/reload: Fetch the cart data from the server using your fetchCart() function and set it in the local state (setCart).

    For runtime updates (e.g., deleting an item): Use the local update approach (setCart with prevItems.filter(...)) for quick and smooth UI changes.

    Optional periodic synchronization: If needed, you can periodically refetch the cart data in the background to ensure consistency (e.g., using setInterval or triggering fetch after certain actions).

    This balances performance and reliability without overloading the server or adding unnecessary latency
     * 
     */
    useEffect(() => {
        // const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        // console.log(total);
        // setCartItems(cart);
        console.log(cart);

    }, [cart]);

    return (
        <div
            className="modal fade"
            id="cartModal"
            aria-labelledby="cartModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content position-relative" style={{ maxHeight: "520px", overflowY: "auto" }}>
                    <div className="modal-header bg-white z-3 position-sticky top-0">
                        <h5 className="modal-title text-primary" id="cartModalLabel">
                            Your Cart
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body px-4 pt-4 bg-white">
                        {
                            cart && cart?.length > 0 ?

                                //Creates a copy of the original array. This ensures the original cart array remains unchanged, as .reverse() modifies arrays in place.
                                // Reverses the order of the copied array so that items appear in reverse order.
                                // Avoid directly modifying the original state in React, as it can lead to unintended side effects.
                                cart?.slice()?.reverse()?.map((item) =>
                                    <div className="cart-item-container position-relative d-flex align-items-start border-bottom pb-3 gap-3 mb-4"
                                        key={item?.id}
                                    >
                                        <div style={{ width: "80px", alignSelf: "stretch" }}>
                                            <img className="w-100 h-100 object-fit-cover" src={item?.imageUrl} alt="" />
                                        </div>
                                        <div className="d-flex flex-grow-1 flex-column text-start">
                                            <h5 className="cart-item-heading mb-3 w-75">
                                                {item?.name}
                                            </h5>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex">
                                                    <button className="btn-subtract" onClick={() => decreaseQuantity(item?.id)}>-</button>
                                                    <div className="btn-quantity">{item?.quantity} </div>
                                                    <button className="btn-add" onClick={() => increaseQuantity(item?.id)}>+</button>
                                                </div>
                                                <h4 className="text-primary">₹ {item?.price * item?.quantity}</h4>
                                            </div>
                                        </div>
                                        <div className="position-absolute top-0 end-0">
                                            <button
                                                type="button"
                                                className="btn-close btn-remove-item"
                                                onClick={
                                                    async () => {
                                                        const deletedItem = await deleteCartItem(item?.id);
                                                        if (deletedItem) {
                                                            setCart((prevItems) => //prevItem represent cart state here
                                                                prevItems.filter((elem) => elem.id !== item.id) //keep only items that do not match the id of item being deleted
                                                            );
                                                        }
                                                    }}

                                            ></button>
                                        </div>
                                    </div>
                                )
                                : <h4>Cart is empty</h4>
                        }

                    </div>
                    <div className="modal-footer bg-white position-sticky bottom-0">
                        <button type="button" className="btn btn-primary">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToCart;
