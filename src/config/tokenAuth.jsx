import clienteAxios from './axios';

const tokenAuth = ( token ) => {

    if (token) {
        //le asignamos un token como default a axios
        clienteAxios.defaults.headers.common['x-auth-token'] = token;

    } else {
        //eliminarlo de axios
        delete clienteAxios.defaults.headers.common['x-auth-token'];

    }
}

export default tokenAuth;