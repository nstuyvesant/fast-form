import axios, { AxiosInstance } from "axios"

export default (targetUri: string): AxiosInstance => {
  return axios.create({
    baseURL: targetUri,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      // Authorization: `Bearer ${store.currentUser.token}`, // send token with each request
      "Content-Type": "application/json",
    },
  })
}
