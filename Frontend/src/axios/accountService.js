import api from "./axiosClient";

const accountApi = {
    login(account) {
        return api.post("/auth/login-jwt", account);
    },
    signin(accountSignIn) {
        return api.post("/account/create", accountSignIn);
    },
    accountdetail(accountid) {
        return api.get("/account/" + accountid);
    },
    update(account) {
        return api.put("/account/update", account);
    },
    updatePassword(updatePasswordBody) {
        return api.post("/auth/update-pass", updatePasswordBody);
    },
    getAllAccount() {
        return api.get("/account/get-all");
    },
    findAllByPhoneNumber(search) {
        return api.post("/account/find-all-by-phone-number", search);
    },
    delete(accountId) {
        return api.delete("/account/delete/" + accountId);
    }
};

export default accountApi;