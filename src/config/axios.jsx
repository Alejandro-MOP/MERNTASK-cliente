import axios from 'axios';

//Apuntar todas las peticiones a la url definida en la variable de entorno
const clienteAxios = axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;