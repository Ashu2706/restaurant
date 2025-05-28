import axios from "axios";
import Api from "../constants/ApiConstant";

const signUpAuth = (data) => {
        return axios.post(`${Api.baseUrl}auth/signup`, data, //return promise if you don't use await or then keyword
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
}

export default signUpAuth;