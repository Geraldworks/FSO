import axios, { all } from "axios";

const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async (id) => {
  const allUsers = await getAll();
  return allUsers.find((user) => user.id === id);
};

export default { getAll, getOne };
