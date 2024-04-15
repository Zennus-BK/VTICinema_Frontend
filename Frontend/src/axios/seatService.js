import api from "./axiosClient";

const seatApi = {
    getByRow(seatSearchRequest) {
        return api.post("/seat/get-by-row", seatSearchRequest)
    }
}

export default seatApi;