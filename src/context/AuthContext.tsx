/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// 1. Create the Context

export type UserObject = {
    email:string,
    token:string
}

interface AuthContextType {
    user: UserObject | null;
    loading: boolean;
    login: (userData: UserObject) => void;
    logout: () => void;
}

interface AuthProviderProps{
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// 2. Create the Provider Component
export const AuthProvider = ({ children }:AuthProviderProps) => {
  
    const [user, setUser] = useState<UserObject | null>(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login Function (Updates State + LocalStorage)
  const login = (userData: UserObject) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout Function (Clears State + LocalStorage)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook to use the Context easily
// export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};