import baseAxios from "@/api/BaseAxios";

const ENDPOINT = "users"

const getAll = async () => {
  return await baseAxios.get(ENDPOINT)
}

export default {
  getAll
}