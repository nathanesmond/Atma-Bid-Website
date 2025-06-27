import { apiClient } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";

export const CreateBid = (auction_id, bid_price, user_id) => {
    if (!auction_id || !bid_price || !user_id) {
        throw new Error("Invalid input: auction_id, bid_price, and user_id are required.");
    }

    return apiClient.post(ENDPOINTS.CREATE_BID, {
        auction_id: parseInt(auction_id, 10),
        bid_price: parseFloat(bid_price),
        user_id: user_id,
        bid_time: new Date().toISOString(),
    });
};
