import { useState } from 'react';
import { api } from '../services/api'
import '../styles/Home.scss'

export function CreateNewUser() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function createUser() {
    
    const result = await api({
      method: 'post',
      url: '/users',
      data: {
        username,
        email,
        password,
      }
    })

    console.log(result);
    
  }

  return (
    <div>

      <div>
        <input
          type="text"
          name="userUsername"
          placeholder="Your name"
          onChange={event => setUsername(event.target.value)}
        />
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

        <button onClick={createUser}>Send</button>
      </div>

    </div>
  )
}