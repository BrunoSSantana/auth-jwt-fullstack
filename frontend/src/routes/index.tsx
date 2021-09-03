import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { CreateNewUser } from '../pages/CreateNewUser'
import { DashBoard } from '../pages/DashBoard'
import { Login } from '../pages/Login'

export function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/new_user" component={CreateNewUser} />
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/dashboard" component={ DashBoard } />
      </Switch>
    </BrowserRouter>
  )
}
