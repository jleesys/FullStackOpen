import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const create = (person) => {
    const requestCreate = axios
        .post(baseUrl, person)
        .catch(err => {
            console.log(err);
        });
    return requestCreate.then(response => response.data);
}

const remove = (id) => {
    const requestDelete = axios
        .delete(`${baseUrl}/${id}`)
        .catch(err => {
            console.log(err);
        });
    return requestDelete.then(response => response.data);
}
export default {
    create: create,
    remove: remove
}