import baseAxios from "@/api/BaseAxios";

const ENDPOINT = "gifts"

export const getAll = async () => {
    return await baseAxios.get(ENDPOINT)
}

const createNewGift = async (gift) => {
    return await baseAxios.post(ENDPOINT, gift)
}
export const deleteById = async (id) => {
    return await baseAxios.delete(`${ENDPOINT}/${id}`)
}
export const updateGift = async (id, payload) => {
    return await baseAxios.put(`${ENDPOINT}/${id}`, payload);
};

export default {
    getAll,
    createNewGift,
    deleteById,
    updateGift
}
