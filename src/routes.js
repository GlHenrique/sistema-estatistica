import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from "./pages/error/NotFound";
import LadingPage from "./pages/LandingPage";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact={true} component={LadingPage}/>
            <Route path="**" component={NotFound}/>
        </Switch>
    )
}
