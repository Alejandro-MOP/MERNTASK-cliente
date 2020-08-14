import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/Proyectos/proyectoContext'; //importamos el context para consumirlo en este componente
import tareaContext from '../../context/Tareas/tareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';



const ListadoTareas = () => {

    //Obtener desde el state, el formulario desde el context proyectoState
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext; 

    //Obtener las tareas del proyecto desde el context tarea
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;


        //Si no hay proyecto seleccionado
        if(!proyecto) return <h2>Selecciona un Proyecto</h2>;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;


    //Eliminar Proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {(tareasproyecto.length === 0) 
                    ?   (<li className="tarea"><p>No hay Tareas</p></li>)
                    :   <TransitionGroup>

                            {tareasproyecto.map(tarea => (
                              
                                <CSSTransition
                                    key={tarea._id}
                                    timeout={450}
                                    classNames="tarea"
                                >
                                    <Tarea
                                        tarea={tarea}
                                    />

                                </CSSTransition>
                            ))}

                        </TransitionGroup>
                }            
                
            </ul>

            <button 
                type="button"
                className="btn btn-eliminar"
                onClick={ () => onClickEliminar()}
            >Eliminar Proyecto &times;</button>

            

        </Fragment>
     );
}
 
export default ListadoTareas;
