import React,{ useContext } from 'react';
import proyectoContext from '../../context/Proyectos/proyectoContext';
import tareaContext from '../../context/Tareas/tareaContext';

const Proyecto = ({proyecto}) => {
    //Obtener desde el state, los proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext; //este context esta disponible en todos lo componentes y podra mostrar el formulario en el aside

    //Obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;


    //Funcion para agregar el proyecto Actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //Fijar un proyecto actual
        obtenerTareas(id); //filtrar las tareas cuando se de click
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;