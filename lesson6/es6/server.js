import axios from 'axios';

let server = axios.create({
	baseURL: '/js-6-api/'
});

server.interceptors.request.use(function(request){
    let token = localStorage.getItem('accessToken');
    if(token) {
        request.headers.Authorization = token;
    }
    return request;
});

server.interceptors.response.use(function(response){
    /*if(typeof response.data !== "object"){
        throw new Error("server did not send json");
    }*/

    return response;
});

export default server;
