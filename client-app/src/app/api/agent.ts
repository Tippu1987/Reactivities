import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL="http://localhost:5000/api";

const sleep=(delay: number)=>{
    return new Promise((resolve)=>{
        setTimeout(resolve, delay);
    });
}


const responseBody=<T>(response:AxiosResponse<T>)=>{return response.data};
axios.interceptors.response.use(async (response)=>{
    try {
        const resp = await sleep(1000);
        return response;
    } catch (error) {
        return await Promise.reject(error);
    }
})
const requests={
    get:  <T> (url:string)=>axios.get<T>(url).then(responseBody),
    post: <T> (url:string, body:{})=>axios.post<T>(url,body).then(responseBody),
    put: <T> (url:string, body:{})=>axios.put<T>(url,body).then(responseBody),
    delete: <T> (url:string)=>axios.delete<T>(url).then(responseBody)
}

const Activities={
    list: ()=>{ return requests.get<Activity[]>('/activities')},
    create: (activity: Activity)=>{ return requests.post<Activity>('/activities',activity)},
    update: (activity: Activity)=>{ return requests.put<Activity>(`/activities/${activity.id}`,activity)},
    delete: (id: string)=>{return requests.delete(`activities/${id}`)}
}

const agent={
    Activities
}
export default agent;