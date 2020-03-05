import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from "./pages/error/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import isAuthenticated from './auth/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
);

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login}/>
                <PrivateRoute path="/home" component={Home} />
                <Route path="**" component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}
