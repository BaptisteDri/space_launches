import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './App'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route exact path="/lancements">
                    <App route="launches" />
                </Route>
                <Route exact path="/fusees">
                    <App route="rockets" />
                </Route>
                <Route exact path="/agences-spatiales">
                    <App route="agencies" />
                </Route>
                <Route path="*">
                    <App route="launches" />
                </Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
