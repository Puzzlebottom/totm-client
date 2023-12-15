import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type AuthToken = string | null;
type AuthTokenContext = {
  token: AuthToken;
  setToken: React.Dispatch<SetStateAction<AuthToken>>;
};

const AuthContext = createContext({} as AuthTokenContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setNewToken] = useState<AuthToken>(
    localStorage.getItem('token')
  );

  const setToken = (newToken: AuthToken) => {
    setNewToken(newToken);
  };

  const contextValue = useMemo(() => {
    return {
      token,
      setToken,
    } as AuthTokenContext;
  }, [token]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
