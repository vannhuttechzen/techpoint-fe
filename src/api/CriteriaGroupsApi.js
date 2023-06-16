import baseAxios from "@/api/BaseAxios";

const ENDPOINT = "criteria-groups"

export const getAll = async () => {
    return await baseAxios.get(ENDPOINT)
}

const getOne = async (id) => {
    return await baseAxios.get(ENDPOINT + `/${id}`)
}

const create = async (data) => {
    return await baseAxios.post(ENDPOINT, data)
}

const update = async (id, data) => {
    return await baseAxios.put(ENDPOINT + `/${id}`, data)
}

const addAdmins = async (groupId, data) => {
    return await baseAxios.post(ENDPOINT + `/${groupId}/add-admins`, data)
}

const deleteById = async (id) => {
    return await baseAxios.delete(`${ENDPOINT}/${id}`)
}
const removeAdminsFromGroup = async (groupId, userId) => {
    return await baseAxios.post(ENDPOINT + '/remove-admin', { groupId, adminId: userId });
}
export default {
    getAll,
    getOne,
    create,
    update,
    addAdmins,
    deleteById,
    removeAdminsFromGroup
}



