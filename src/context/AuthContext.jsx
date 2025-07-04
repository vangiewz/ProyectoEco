import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Inicializar estado según sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Función de login
  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { success: false, message: error.message }
    return { success: true, user: data.user }
  }

  // Función de registro
 const signUpUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return { success: false, message: error.message }
  }

  // ⚠️ Casos de duplicado: identities vacío o undefined
  if (!data?.user?.identities || data.user.identities.length === 0) {
    return {
      success: false,
      message: 'Este correo ya está registrado. Intenta iniciar sesión.'
    }
  }

  return { success: true, user: data.user }
}

  // Función de logout
  const signOutUser = async () => {
  await supabase.auth.signOut()
  window.location.replace('/login')
}

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInUser,
      signUpUser,    // ← AÑADIDA
      signOutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
