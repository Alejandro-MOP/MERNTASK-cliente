import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

import ProyectoState from './context/Proyectos/proyectoState';
import TareaState from './context/Tareas/tareaState';
import AlertaState from './context/Alertas/alertaState';
import AuthState from './context/Autenticacion/authState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

//npm i axios para las peticiones http

//REVISAR SI EXISTE UN TOKEN
const token = localStorage.getItem('token');
    if (token) {
        tokenAuth(token);
    }

function App() {

    //console.log(process.env.REACT_APP_BACKEND_URL); variable de entorno 

  return (

    <ProyectoState>
        <TareaState>
            <AlertaState>
                <AuthState>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                            <RutaPrivada exact path="/proyectos" component={Proyectos} />
                        </Switch>
                    </Router>
                </AuthState>
            </AlertaState>
        </TareaState>
    </ProyectoState>

  );
}

export default App;
