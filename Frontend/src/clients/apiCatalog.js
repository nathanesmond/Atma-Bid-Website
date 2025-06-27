import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export const GetAllCatalog = () =>
    apiClient.get(ENDPOINTS.GET_ALL_CAR_CATALOGS);

export const CreateCarCatalog = (data) =>
    apiClient.post(ENDPOINTS.CREATE_CAR_CATALOGS, data);

export const ShowCarCatalog = (id) =>
    apiClient.get(ENDPOINTS.SHOW_CAR_CATALOG(id));

export const UpdateCarCatalog = (id, data) =>
    apiClient.put(ENDPOINTS.UPDATE_CAR_CATALOG(id), data);

export const DeleteCarCatalog = (id) =>
    apiClient.delete(ENDPOINTS.DELETE_CAR_CATALOG(id));
