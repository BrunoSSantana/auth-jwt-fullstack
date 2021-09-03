import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;

}
// Os dados que serão passados pelo context em "value={}"
type AuthContextType = {
  user: User | undefined;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user,setUser] = useState<User>()
  const token = localStorage.getItem('token')

  useEffect(() => {
    (async function getUser() {
      try {
  
        const result = await api({
          method: 'post',
          url: '/validate',
          headers: { 'authorization': token }
        })
  
        const { user } = result.data
  
        setUser(user)
      } catch (err) {
        alert(err)
      }
    })()
  }, [token])




  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
}