import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export const GetAllCars = () =>
    apiClient.get(ENDPOINTS.GET_ALL_CAR);

export const CreateCar = (data) =>
    apiClient.post(ENDPOINTS.CREATE_CAR, data);

export const ShowCar = (id) =>
    apiClient.get(ENDPOINTS.SHOW_CAR(id));

export const UpdateCar = (id, data) =>
    apiClient.put(ENDPOINTS.UPDATE_CAR(id), data);

export const DeleteCar = (id) =>
    apiClient.delete(ENDPOINTS.DELETE_CAR(id));