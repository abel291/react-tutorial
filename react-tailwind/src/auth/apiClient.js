import axios from 'axios';


//let CancelToken = axios.CancelToken;
//let axiosSource = CancelToken.source();


const apiClient = axios.create({
    baseURL: 'http://192.168.0.104',
    withCredentials: true,
    timeout:30000
    //cancelToken : axiosSource.token
});

//margin top login register 
// api register devuelva el user


//terminar los de los transition
 
export default apiClient;