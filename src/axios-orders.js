import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-4e415.firebaseio.com/',
});

export default instance;