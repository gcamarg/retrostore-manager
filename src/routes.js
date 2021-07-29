import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom' // npm install react-router-dom -- pacote lidar com direcionamento das rotas
import Client from './components/Client'
import Management from './components/productsMan'

export default function Routes() {
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Client} />
            
            <Route path='/manager' component={Management} />
        </Switch>
        </BrowserRouter>
    )
}