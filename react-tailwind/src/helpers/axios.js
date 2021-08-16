import axios from 'axios';
const instance = axios.create({baseURL: 'http://hotel-cartagena.test/api/'});
export default instance