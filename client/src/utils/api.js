import axios from "axios";

export default {
    test: () => {
        console.log('testing!')
        return axios.get('/test');
    },
    signin: (token) => {
        return axios.post("/api/signin", { token: token });
    }
}