import { api } from "./api";

// verifica se existe token

// envia o token para o back pra receber uma auth

// se auth for true, a função retorna true

// se tiver expirado executa o refresh token onde vai setar um novo token e um novo refresh token e então retornará true

export async function isAuthenticated() {

  const token = localStorage.getItem('token')
  const refresh_token = localStorage.getItem('refresh_token') as string
  if (!token) {
    return false
  }

  async function validationToken() {
    try {

      const result = await api({
        method: 'post',
        url: '/validate',
        headers: { 'authorization': token }
      })

      const { auth, refresh } = result.data

      if (refresh) {

        try {
          const result = await api({
            method: 'post',
            url: '/refresh',
            headers: { 'x-access-token': refresh_token }
          })

          const { auth, token, refresh_token: new_refresh_token } = result.data

          localStorage.setItem('token', token)
          localStorage.setItem('refresh_token', new_refresh_token)

          return auth

        } catch (err) {

          alert(err);
        }

      }
      return auth
    } catch (err) {
      alert(err)
    }
  }

  const auth = await validationToken()

  return auth
}