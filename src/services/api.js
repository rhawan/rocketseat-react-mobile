import axios from "axios";

const api = axios.create({ baseURL: "https://rockseat-react-backend.herokuapp.com" });

export default api;