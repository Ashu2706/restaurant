import axios from "axios";
import Api from "../constants/ApiConstant";
import { Cookies } from "react-cookie";
import { Bounce, toast } from "react-toastify";

const deleteCartItem = async (id) => {
    const cookies = new Cookies();
    const token = cookies.get('authToken');
    
    try {
        const response = await axios.delete(`${Api.baseUrl}cart/delete/by/id?id=${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                } 
            });

        if (response?.status === 200) {
            // console.log(response);
            return response.data
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

export default deleteCartItem;