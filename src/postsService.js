import axios from "axios";

const apiGatewayUrl = "http://localhost:8080";

export const getPosts = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem('jwt')}`
        }
    };
    return axios.get(`${apiGatewayUrl}/api/v1/posts`, config);
};