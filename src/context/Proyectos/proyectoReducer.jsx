import 
    {
        FORMULARIO_PROYECTO, 
        OBTENER_PROYECTOS,
        AGREGAR_PROYECTOS,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        PROYECTO_ERROR
    } 
from '../../types/index';


export default (state, action) => {
    //reducer generar el cambio de estado que recibe
    switch(action.type){
        
        case FORMULARIO_PROYECTO:
            return{
                ...state,
                formulario: true //para poder mostrar el formulario de proyectos en el dispatch
            }
        
        case OBTENER_PROYECTOS:
            //console.log(action.payload);
            return{
                ...state,
                proyectos: action.payload //obtenemos todos los proyectos del dispatch
            }

        case AGREGAR_PROYECTOS:
            return{
                ...state,
                proyectos: [ ...state.proyectos, action.payload ],
                formulario: false,
                errorformulario: false
            }
        
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }

        case PROYECTO_ACTUAL:
            return{
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload)
            }
        
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }

        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }
}