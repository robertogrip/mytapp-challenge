import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import Home container
import { Home, Beer, Search, NotFound } from './containers';

class Routes extends Component {
    render() {
        return (
            <div className="beer-app">
                <Router>
                    <Switch>
                        <Route path="/" exact={true} component={Home} />
                        <Route path="/beer/:id" exact={true} component={Beer} />
                        <Route path="/search/:term" exact={true} component={Search} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Routes;
