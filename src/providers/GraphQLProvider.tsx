import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ReactNode } from 'react';
import { useAuth } from './AuthProvider';

function GraphQLProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();

  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphQLProvider;
