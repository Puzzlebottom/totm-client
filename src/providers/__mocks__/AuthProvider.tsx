import { ReactNode, createContext, useContext, useMemo } from 'react';

type AuthToken = string | null;
type AuthTokenContext = {
  token: AuthToken;
};

const AuthContext = createContext({} as AuthTokenContext);

type Props = { children: ReactNode; testValue: AuthToken };

function AuthProvider({ children, testValue }: Props) {
  const testContext = useMemo(() => {
    return { token: testValue };
  }, [testValue]);

  return (
    <AuthContext.Provider value={testContext}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
