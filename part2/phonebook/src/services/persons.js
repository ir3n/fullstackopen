import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = (newItem) => {
  const req = axios.post(baseUrl, newItem);
  return req.then((res) => res.data);
};

export default { getAll, create };
