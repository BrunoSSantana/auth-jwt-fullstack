import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

type ProtectedRouteProps = {
  component: React.ComponentType<any>;
  path: string;
}

export function PrivateRoute({ component: Component, ...rest }: ProtectedRouteProps) {

  const [isAuth, setAuth] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      AsyncAuthenticated()
    })()
  }, [])

  async function AsyncAuthenticated() {
    const response = await isAuthenticated()    
    setAuth(response)
  }
  
  return (
    <Route {...rest} render={props => (
      isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    )} />
  )
}