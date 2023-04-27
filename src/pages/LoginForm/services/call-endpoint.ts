import axios from "axios"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callEndpoint = (data: any) => {
    console.log({data});
    return axios.get('https://rickandmortyapi.com/api/character/2').then(response => response.data);
}