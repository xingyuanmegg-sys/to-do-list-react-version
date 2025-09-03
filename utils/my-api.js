import axios from "axios";
export default function getTodos() {
  return axios.get("https://dummyjson.com/toos");
}
