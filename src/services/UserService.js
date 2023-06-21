import http from "../components/HTTP/htttp-common";


const create = data => {
  return http.post("/users", data);
};

const login = data =>{
    return http.post("/users/login", data);
  }

export default {

    create,login

  };