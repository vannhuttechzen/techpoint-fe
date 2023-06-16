import baseAxios from "@/api/BaseAxios";

const ENDPOINT = "point"
const getSelfPoint = async () => {
  return await baseAxios.get(`${ENDPOINT}/me`)
}

const getTop10 = async () => {
  return await baseAxios.get(`${ENDPOINT}/top10-total-of-point`)
}
export default {
  getSelfPoint,
  getTop10
}