import React, { useState, useContext, createContext } from 'react'
import Cookie from 'js-cookie'
import axios from 'axios'
import { WebServices } from '@services/api/index'
const authContext = createContext()

export function ProviderAuth({ children }) {
  const auth = useProviderAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProviderAuth() {
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState(null)

  const options = {
    headers: {
      accept: '*',
      'Content-Type': 'application/json',
    },
  }

  const signIn = async (email, password) => {
    try {
      const { data: access_token } = await axios.post(
        WebServices.auth.login,
        {
          email,
          password,
        },
        options
      )

      if (access_token && access_token !== undefined) {
        Cookie.set('access_token', access_token.access_token, { expires: 5 })
        Cookie.set('refresh_token', access_token.refresh_token, { expires: 5 })

        axios.defaults.headers.Authorization = `Bearer ${access_token.access_token}`
        const { data: user } = await axios.get(WebServices.auth.profile, options)
        setUser(user)
        setAuthError('')
      }
    } catch (authError) {
      setAuthError('Email or password is incorrect')
    }

    return { user, authError }
  }

  return {
    user,
    signIn,
    authError,
  }
}
