import React, { useContext } from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext';
import tareaContext from '../../context/Tareas/tareaContext';
//import { actualizarTarea } from '../../../../servidor/controllers/tareaController';

const Tarea = ({tarea}) => {

    //Obtener desde el state, los proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //Extraer el proyecto con destructuring
    const [ proyectoActual ] = proyecto;

    //funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    //Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if( tarea.estado ) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    //Agrega una tarea actual en el formulario cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {(tarea.estado)
                    ?   (
                            <button
                                type="button"
                                className="completo"
                                onClick={ () => cambiarEstado(tarea) }
                            >Completo</button>
                        )
                    :   (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={ () => cambiarEstado(tarea) }
                            >Incompleto</button>
                        )
                }
            </div>

            <div className="acciones">

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ ()=> seleccionarTarea(tarea) }
                >Editar</button>

                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => tareaEliminar(tarea._id) }
                >Eliminar</button>

            </div>
        </li>

     );
}
 
export default Tarea;
