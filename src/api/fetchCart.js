import axios from "axios";
import Api from "../constants/ApiConstant";
import { Cookies } from "react-cookie";
import { Bounce, toast } from "react-toastify";

const fetchCart = async () => {
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const token = cookies.get('authToken');
    try {
        const response = await axios.get(`${Api.baseUrl}cart/get/by/userId?userId=${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

        if (response?.status === 200) {
            // console.log(response);
            return response?.data;
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
        console.log(error?.message);
        toast.error("Unable to show Cart", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            transition: Bounce,
        });
        return null;
    }
}

export default fetchCart;