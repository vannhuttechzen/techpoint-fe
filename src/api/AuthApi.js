import baseAxios from "@/api/BaseAxios";

const ENDPOINT = "auth"

const login = async (data) => {
  return await baseAxios.post(`${ENDPOINT}/login`, data)
}

const getAuthInfo = async () => {
  return await baseAxios.get(`${ENDPOINT}/me`)
}
export default {
  login,
  getAuthInfo
}