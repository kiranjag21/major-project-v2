import axios from "axios";

export default axios.create({
  baseURL: `${process.env.BASE_API_URL}/api`,
  headers: {
    "Content-type": "application/json"
  }
});