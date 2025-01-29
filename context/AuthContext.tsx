import { createContext, ReactNode, useContext, useState } from 'react'

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null)

  const setAuth = (user: any) => {
    setUser(user)
  }

  const setUserData = (userData: any) => {
    setUser({ ...userData })
  }

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
