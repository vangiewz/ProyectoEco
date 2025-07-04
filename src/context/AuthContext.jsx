import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null)
        } else {
          setUser(session?.user ?? null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])


  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { success: false, message: error.message }
    return { success: true, user: data.user }
  }

  // registro
  const signUpUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error)       return { success: false, message: error.message }
    if (!data?.user?.identities || data.user.identities.length === 0) {
      return { success: false, message: 'Este correo ya está registrado. Intenta iniciar sesión.' }
    }
    return { success: true, user: data.user }
  }

  // logout
  const signOutUser = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInUser,
      signUpUser,
      signOutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
