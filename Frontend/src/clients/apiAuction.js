import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export const GetAllAuction = () =>
    apiClient.get(ENDPOINTS.GET_ALL_AUCTION);

export const CreateAuction = (data) =>
    apiClient.post(ENDPOINTS.CREATE_AUCTION, data);

export const ShowAuction = (id) =>
    apiClient.get(ENDPOINTS.SHOW_AUCTION(id));

export const UpdateAuction = (id, data) =>
    apiClient.put(ENDPOINTS.UPDATE_AUCTION(id), data);

export const DeleteAuction = (id) =>
    apiClient.delete(ENDPOINTS.DELETE_AUCTION(id));
