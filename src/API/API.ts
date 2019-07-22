import axios from 'axios';

const SERVER_API = 'https://jsonplaceholder.typicode.com';


function authChecker(response:any){
    if (response.status === 401){
        window.location.href = '/';
        localStorage.removeItem('token');
    } else return response
}

export const getDoctors = () => {
    let myHeaders = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    });
    return axios({
        method: 'get',
        headers: myHeaders,
        url: `${SERVER_API}/users`,
    })
        .then(res => res)
        .catch(err => authChecker(err.response));

};