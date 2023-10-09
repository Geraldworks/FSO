import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = async (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

const update = async (id, newPerson) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson);
  return request.then((response) => response.data);
};

const removePerson = async (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  // might need to add something here
};

export default { getAll, create, update, removePerson };
