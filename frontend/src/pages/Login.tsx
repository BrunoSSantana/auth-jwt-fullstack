import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api'
import '../styles/Home.scss'


export function Login() {
  const history = useHistory()

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function handleLogin() {

    if (email.trim() === '' || password.trim() === '') {
      return null
    }

    const result = await api({
      method: 'post',
      url: '/login',
      data: {
        email,
        password,
      }
    })

    const { token, refresh_token } = result.data

    localStorage.setItem('token', token)
    localStorage.setItem('refresh_token', refresh_token)

    history.push('/dashboard')

  }

  return (
    <div>

      <div>
        <input
          type="text"
          name="userEmail"
          placeholder="E-mail"
          onChange={event => setEmail(event.target.value)}

        />
        <input
          type="text"
          name="userPassword"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}

        />

        <button onClick={handleLogin}>Send</button>
      </div>

    </div>
  )
}