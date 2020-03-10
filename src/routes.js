import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from "./pages/error/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";
import DescriptiveStatistics from "./pages/DescriptiveStatistics";


export default function Routes() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path="/home" component={Home} />
                    <PrivateRoute exact path="/discriptive-statistics" component={DescriptiveStatistics} />
                    <Route exact path="/" render={Login} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route path="**" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    )
}
