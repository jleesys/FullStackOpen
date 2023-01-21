import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (userSubmitToken) => {
  token = `bearer ${userSubmitToken.token}`;
  // console.log(token);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const submitBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async ({ id, blog }) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

// eslint-disable-next-line no-unused-vars
const remove = async (id, user) => {
  const config = {
    headers: { Authorization: token }
  };
  console.log(token, config);
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};


export default { getAll, setToken, submitBlog, update, remove };