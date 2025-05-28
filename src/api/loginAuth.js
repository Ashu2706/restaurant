import axios from "axios";
import Api from "../constants/ApiConstant";

const loginAuth =  (payload) => {
        return axios.post(`${Api.baseUrl}auth/login`, payload, //return promise
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
}

export default loginAuth;