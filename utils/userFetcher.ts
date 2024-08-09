import axios from 'axios';

const userFetcher = <Data>(url: string, userId: string) => 

    axios
    .get(`${url}?userId=${userId}`, {
        withCredentials: true
    })
    .then( (response) => response.data)
    .catch(() => console.log("sssssssss",url))


export default userFetcher;