import axios from "axios";
import { API_BASE_URL } from "./constants";
const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export default http;
