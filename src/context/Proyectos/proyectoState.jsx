import React, {useReducer} from 'react';
//import { v4 as uuidv4 } from 'uuid'; Se descarta por que ya se asigna un id atravez de backend (Mongo DB)

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
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

import clienteAxios from '../../config/axios';


const ProyectoState = props => {

    /*const proyectos =[
        {id: 1, nombre: 'Tienda Virtual'},
        {id: 2, nombre: 'Intranet'},
        {id: 3, nombre: 'Diseño Sitio Web'},
        {id: 4, nombre: 'MERN'}
    ]*/ //se utilizo para simular BD

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    }

    //Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(proyectoReducer, initialState);

    //alerta para mostrar si hay errores en CRUD
    // const alerta = {
    //     msg: 'Hubo un error al realizar la ejecución, intenta mas tarde',
    //     categoria: 'alerta-error'
    // }

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {

        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener los Proyectos
    const obtenerProyectos = async () => {
        
        try {

            const resultado = await clienteAxios.get('/api/proyectos');

                dispatch({
                    type: OBTENER_PROYECTOS,
                    payload: resultado.data.proyectos
                })
            
        } catch (error) {
            
            const alerta = {
                msg: 'Hubo un error al realizar la ejecución, intenta mas tarde',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
    }

    //Agregar Nuevo Proyecto
    const agregarProyecto = async proyecto => {
        //proyecto.id = uuidv4(); Se descarta por que ya se asigna un id atravez de backend (Mongo DB)
        try {
            
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            
                console.log(resultado);
            
                //insertar el proyecto en el state
                dispatch ({
                    type: AGREGAR_PROYECTOS,
                    payload: resultado.data
                })
            
        } catch (error) {
            
            const alerta = {
                msg: 'Hubo un error al realizar la ejecución, intenta mas tarde',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
        
    }

    //Validar el formulario por Errores
    const mostrarError = () => {

        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona proyecto al dar click
    const proyectoActual = proyectoId => {

        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //elimina un proyecto
    const eliminarProyecto = async proyectoId => {

        try {
            
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
                
        } catch (error) {
            //console.log(error);
            const alerta = {
                msg: 'Hubo un error al realizar la ejecución, intenta mas tarde',
                categoria: 'alerta-error'
            }

            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })

        }
    }


    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;