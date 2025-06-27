import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export const GetAllUpcoming = () =>
    apiClient.get(ENDPOINTS.GET_ALL_UPCOMING);
