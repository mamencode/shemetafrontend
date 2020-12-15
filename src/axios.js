import axios from "axios"


const instance = axios.create({
  baseURL: "https://ethamazona.herokuapp.com"
})

export default instance