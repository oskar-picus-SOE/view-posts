import axios from "axios";

const apiGatewayUrl = "http://localhost:9090";

export const getPosts = async () => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem('jwt')}`
        }
    };
    return axios.get(`${apiGatewayUrl}/api/v1/posts`, config);
};