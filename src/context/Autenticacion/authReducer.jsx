import 
    {
        REGISTRO_EXITOSO,
        REGISTRO_ERROR,
        OBTENER_USUARIO,
        LOGIN_EXITOSO,
        LOGIN_ERROR,
        CERRAR_SESION 
    } 
from '../../types';

export default ( state, action ) => {

    switch (action.type) {

        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
            localStorage.setItem('token', action.payload.token); //guarda el token de la api en el local storage
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false //evitar flash al cargar pagina
            }

        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: false,
                mensaje: action.payload,
                cargando: false //evitar flash al cargar pagina
            }
        
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                usuario: action.payload,
                cargando: false //evitar flash al cargar pagina
            }
        
        
        default:
            return state;
            
    }
}