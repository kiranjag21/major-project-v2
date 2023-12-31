  
import React from 'react';
import { Route, Redirect } from 'react-router-dom';



export const PrivateRoute = ({ component: Component, setOpenLogin, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = localStorage.getItem("login");
       
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            setOpenLogin(true);
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
       
        return <Component {...props} />
    }} />
)
