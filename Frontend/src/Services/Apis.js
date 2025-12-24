const BaseURL = "http://localhost:4001/api/";

export const authEndpoints = {
    LOGIN_API: BaseURL + "auth/login",
    REGISTER_API: BaseURL+ "auth/register",
}

export const userEndpoints = {
    GET_PROFILE: BaseURL+ "user/",
    SET_USER_PROFILE: BaseURL+ "user/updateuser",
}

