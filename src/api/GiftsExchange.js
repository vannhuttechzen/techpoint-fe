import baseAxios from "@/api/BaseAxios";

const ENDPOINT = "gift-exchange"

export const getAll = async () => {
  return await baseAxios.get(`${ENDPOINT}/list`)
}

export const getDetailRequest = async (id) => {
  return await baseAxios.post(`${ENDPOINT}/${id}`)
}

export const approveRequest = async (params) => {
  return await baseAxios.put(`${ENDPOINT}`, params)
}

export const createRequest = async (payload) => {
  return await baseAxios.post(`${ENDPOINT}/create`, payload)
}

export const giftExchangeHistoryMe = async (userId) => {
  return await baseAxios.get(`${ENDPOINT}/listByUser?id=` + userId)
}

export const giftExchangeConfirmReceiveGift = async (params) => {
  return await baseAxios.put(`${ENDPOINT}/user-confirm`, params)
}

export const giftExchangeConfirmRejectGift = async (params) => {
  return await baseAxios.put(`${ENDPOINT}/user-reject `, params)
}

export default {
  getAll,
  getDetailRequest,
  createRequest,
  approveRequest,
  giftExchangeHistoryMe,
  giftExchangeConfirmReceiveGift,
  giftExchangeConfirmRejectGift
}