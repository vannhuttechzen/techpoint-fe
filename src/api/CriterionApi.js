import baseAxios from "@/api/BaseAxios";

const ENDPOINT = "criterion"
export const deleteById = async (id) => {
    return await baseAxios.delete(`${ENDPOINT}/${id}`)
}

export const updateCriterion = async (id, payload) => {
    return await baseAxios.put(`${ENDPOINT}/${id}`, payload);
};

const createNewCriterion = async (data) => {
    return await baseAxios.post(ENDPOINT, data)
}
export const getAll = async () => {
    return await baseAxios.get(ENDPOINT)
}
export default {
    deleteById,
    updateCriterion,
    createNewCriterion,
    getAll
}


