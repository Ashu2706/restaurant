import React, { useContext, useState } from 'react'
import addToCart from '../../api/addToCart';
import { AuthContext, CartContext } from '../../App';
import fetchCart from '../../api/fetchCart';
import Loader from '../Loader/Loader';

export const MenuElement = ({ menu, setMenu, setShowLoginMsg }) => {
    const { setCart } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);

    const handleAddToCart = async (item) => {
        if (!isAuthenticated) {
            setShowLoginMsg(true);
            return;
        }
        setLoader(true);
        const data = await addToCart(item);
        console.log("Add To Cart Response: ",data);
        if(data){
            const updatedCart = await fetchCart();
            if(updatedCart)
                setCart(updatedCart);
        }
        setLoader(false);
    }

    const handleSubtract = (item) => {
        if (item?.quantity === 1)
            return

        const updatedMenu = {
            ...menu,
            recipes: menu.recipes.map(recipe => {
                // Check if the recipe's id matches the given itemId
                if (recipe.id === item?.id) {
                    // Decrement the quantity for the matched item
                    return {
                        ...recipe,
                        quantity: recipe.quantity - 1
                    };
                }
                return recipe; // Return the recipe as is for unmatched items
            })
        };
        setMenu(updatedMenu);

    }
    const handleAdd = (item) => {

        if (item?.quantity === 4)
            return

        const updatedMenu = {
            ...menu,
            recipes: menu.recipes.map(recipe => {
                // Check if the recipe's id matches the given itemId
                if (recipe.id === item?.id) {
                    // Increment the quantity for the matched item
                    return {
                        ...recipe,
                        quantity: recipe.quantity + 1
                    };
                }
                return recipe; // Return the recipe as is for unmatched items
            })
        };
        setMenu(updatedMenu);

    }

    return (
        menu?.recipes?.map((recipe) => {
            return (
                <div className="col-lg-6 mb-3 mb-sm-4" key={recipe?.id}>
                    <div className="d-flex align-items-start">
                        <img className="flex-shrink-0 img-fluid rounded" src={recipe?.image} alt="" style={{ width: "100px", marginTop: "4px" }} />
                        <div className="w-100 d-flex flex-column text-start ps-4">
                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                                <span id="dinner-dish-name">{recipe?.name}</span>
                                <span className="text-primary">₹{recipe?.price}</span>
                            </h5>
                            <div className="d-flex gap-3 align-items-center">
                                <div className="ratings">
                                    {
                                        Array(5).fill().map((_, i) => (
                                            (i + 1) <= Math.round(recipe?.rating) ? //the rating start from 1 but initially i=0
                                                <i key={i} className="fa fa-star rating-color"></i>
                                                : <i key={i} className="fa fa-star rating-nocolor"></i>

                                        ))
                                    }
                                </div>
                                <a className="review-count text-decoration-underline">{recipe?.reviewCount} Reviews</a>
                            </div>
                            <small className="fst-italic" id="dinner-dish-ingred">{recipe?.desc}</small>
                            <div className="d-flex mt-2">
                                <button className="btn-subtract" onClick={() => handleSubtract(recipe)}>-</button>
                                <div className="btn-quantity">{recipe?.quantity}</div>
                                <button className="btn-add" onClick={() => handleAdd(recipe)}>+</button>
                            </div>
                            <button className="btn-cart" onClick={
                                () => {
                                    handleAddToCart(recipe);
                                }
                            }>Add To Cart</button>
                        </div>
                    </div>
                    <Loader  isActive={loader}/>
                </div>
            )
        })

    )
}
