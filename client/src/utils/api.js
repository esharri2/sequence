import axios from "axios";

export default {
    test: () => {
        console.log('testing!')
        return axios.get('/test');
    },
    signin: (token) => {
        return axios.post("/api/signin", { token });
    },
    signout: () => {
        return axios.get("/api/signout");
    },
    authcheck: (id) => {
        return axios.get("/api/authcheck", { id })
    },
    //not sure if I need userid here...
    save: (userId, sequence) => {
        return axios.post("/api/save", { userId, sequence })
    },
    update: (sequenceId, sequence) => {
        return axios.post("/api/update", { sequenceId, sequence })
    },
    delete: (sequenceId) => {
        return axios.delete(`/api/delete/${sequenceId}`)
    },
    getSequence: id => {
        return axios.get(`/api/sequence/${id}`)
    },
    getSequences: () => {
        return axios.get("/api/saved")
    }
}