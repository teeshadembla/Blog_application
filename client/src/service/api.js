import axios from 'axios';
import { API_NOTIF_MESSAGES, SERVICE_URLS } from '../constants/config.js';
const API_URL = 'http://localhost:8000';

// we will be using axios interceptor
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //we should stop global loader here, since we have none
        // we are not going to code anything for the same
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)

const processResponse = (response) =>{
    if(response?.status === 200){
        return {isSuccess: true, data: response.data}
    }else{
        return{
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    
    if(error.response){
        //response comes when the request sent is susccessful but the response from the server has a status code 
        //other than 200
        console.log("ERROR IN RESPONSE", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIF_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request){
        // request is successfully sent but there has been no response
        // this signifies there is some connectivity issue
        console.log("ERROR IN REQUEST", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIF_MESSAGES.requestFailure,
            code: ""
        }
    }else{
        // Something happened in setting up request that triggers an error
        console.log("ERROR IN NETWORK", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIF_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for(const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        return axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? '' : body,
            responseType: value.responseType,
            onUploadProgress: function (progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total )
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total )
                    showDownloadProgress(percentageCompleted);
                }
            },
        })
    }
}

export {API};

