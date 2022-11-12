import axios from 'axios'
const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    const request =
        axios
            .get(baseURL)
            .then(response => response.data);
    return request;
}

const create = (newObject) => {
    const request =
        axios
            .post(baseURL, newObject)
            .then(response => response.data);
    return request;
}

export default { getAll, create }