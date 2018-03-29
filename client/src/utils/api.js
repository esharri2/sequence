import axios from "axios";

export default {
    test: () => {
        return axios.get("/api/test")
    }
}