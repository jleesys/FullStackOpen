import axios from 'axios'
const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseURL).then(response => response.data);
    return request;
    // return 'Lol this worked'
}

export default {getAll}