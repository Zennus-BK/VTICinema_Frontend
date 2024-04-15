import api from "./axiosClient";

const showtimeApi = {
    getById(showtimeId) {
        return api.get("/movieshowtime/all/" + showtimeId)
    }
}

export default showtimeApi;