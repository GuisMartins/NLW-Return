import axios from "axios";

console.log(import.meta.env)

export const api = axios.create({
  baseURL: 'http://localhost:3333'
})