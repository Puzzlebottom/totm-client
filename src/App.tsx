import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

const queryClient = new QueryClient();

export function WrappedApp() {
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <NavBar links={['Heroes', 'Monsters', 'Locations', 'Treasure']} />
        <App />
      </QueryClientProvider>
    </HashRouter>
  );
}
