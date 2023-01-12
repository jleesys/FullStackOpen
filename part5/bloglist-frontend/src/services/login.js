import axios from 'axios';
const baseUrl = '/api/login';

const submitLogin = async (credentials) => {
    // console.log('inside submitlogin func')
    const response = await axios.post(baseUrl, credentials);
    // console.log('here')
    return response.data;
}

export default { submitLogin }