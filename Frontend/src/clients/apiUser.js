import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export const GetProfile = () =>
    apiClient.get(ENDPOINTS.GET_PROFILE);

export const UpdateProfile = (formData) =>
    apiClient.post(ENDPOINTS.UPDATE_PROFILE, formData);

export const ChangePassword = (formData) =>
    apiClient.post(ENDPOINTS.CHANGE_PASSWORD, formData);
