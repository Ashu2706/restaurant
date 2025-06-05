import axios from "axios";
import Api from "../constants/ApiConstant";
import { Cookies } from "react-cookie";
import { Bounce, toast } from "react-toastify";

const updateCart = async (data) => {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const token = cookies.get('authToken');
    
    const body = {
        "id": data?.id,
        "userId": parseInt(userId), // userId,
        "name": data?.name,
        "price": data?.price,
        "quantity": data?.quantity,
        "imageUrl": data?.imageUrl
    }
    console.log("Req Body: ",body);
    
    try {
        const response = await axios.put(`${Api.baseUrl}cart/update`, body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                } 
            });

        if (response?.status === 200) {
            // console.log(response);
            return response?.data?.data;
        }
        else {
            console.log(response?.data?.message);
            toast.error("Something Went Wrong", {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
                transition: Bounce,
            });
            return null;
        }
    }
    catch (error) {
        toast.error("Something Went Wrong", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Bounce,
        });
        console.log(error?.message);
    }
}

export default updateCart;