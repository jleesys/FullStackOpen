import axios from 'axios'
// LOCALHOST URL FOR TESTING 
const baseURL = '/api/persons';
// DEPLOYED APP VIA FLYIO
// const baseURL = 'https://silent-meadow-1209.fly.dev/api/persons';

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

const remove = (id) => {
    const request = 
        axios
            .delete(`${baseURL}/${id}`);
    return request;
}

const update = (id, updatedObject) => {
    const request = 
        axios 
            .put(`${baseURL}/${id}`, updatedObject)
            .then(response => response.data);
    return request;
}

export default { getAll, create, remove, update }