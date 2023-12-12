import { HashRouter, Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import './index.css';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// const queryClient = new QueryClient();

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export function WrappedApp() {
  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <NavBar links={['Heroes', 'Monsters', 'Locations', 'Treasure']} />
        <App />
      </ApolloProvider>
    </HashRouter>
  );
}
