import axios from "axios";
import Api from "../constants/ApiConstant";
import { Cookies } from "react-cookie";
import { Slide, toast, Zoom } from "react-toastify";

const addToCart = async (payload) => {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const token = cookies.get('authToken');
    const body = {
        "userId": parseInt(userId), // userId,
        "name": payload?.name,
        "price": payload?.price,
        "quantity": payload?.quantity,
        "imageUrl": payload?.image
    }
    try {
        const response = await axios.post(`${Api.baseUrl}cart/add`, body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                } 
            });

        if (response?.status === 200) {
            console.log(response);
            toast.success("Item Added", { 
                position: "bottom-center",
                autoClose: 3000,
                theme: "colored",
                transition: Zoom, 
                
            });
            return response?.data;
        }
        else {
            console.log(response?.data?.message);
            toast.error("Something went wrong", { 
                position: "bottom-center",
                autoClose: 3000,
                theme: "colored",
                transition: Zoom, 
                
            });
            return null;
        }
    }
    catch (error) {
        toast.error("Something went wrong", { 
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored",
            transition: Zoom, 
        });
        console.log(error?.message);
        return null;
    }
}

export default addToCart;