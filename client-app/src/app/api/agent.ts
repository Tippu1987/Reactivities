import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL="http://localhost:5000/api";

const responseBody=<T>(response:AxiosResponse<T>)=>{return response.data};

const requests={
    get:  <T> (url:string)=>axios.get<T>(url).then(responseBody),
    post: <T> (url:string, body:{})=>axios.post<T>(url,body).then(responseBody),
    put: <T> (url:string, body:{})=>axios.put<T>(url,body).then(responseBody),
    delete: <T> (url:string)=>axios.delete<T>(url).then(responseBody)
}

const Activities={
    list: ()=>{ return requests.get<Activity[]>('/activities')}
}

const agent={
    Activities
}
export default agent;