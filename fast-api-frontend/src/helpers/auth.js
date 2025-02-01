export const getAccessToken = () => {
    return localStorage.getItem("token");
}

export const getCurrentUserID = () => {
    return Number(localStorage.getItem("user_id"));
}