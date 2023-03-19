import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/expenses';

const getAll = () => {
    const response = axios.get(baseUrl);
    return response.then(response => response.data);
}

export default { getAll };