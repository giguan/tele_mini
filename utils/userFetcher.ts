import axios from 'axios';

const fetcher = <Data>(url: string, userId: string) => 


    axios
    .get(`${url}?userId=${userId}`, {
        withCredentials: true
    })
    .then( (response) => response.data)
    .catch(() => console.log("sssssssss",url))


export default fetcher;