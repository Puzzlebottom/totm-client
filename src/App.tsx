import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import './index.css';
import AuthProvider from './providers/AuthProvider';
import GraphQLProvider from './providers/GraphQLProvider';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <AuthProvider>
        <GraphQLProvider>
          <NavBar links={['Heroes', 'Monsters', 'Locations', 'Treasure']} />
          <App />
        </GraphQLProvider>
      </AuthProvider>
    </HashRouter>
  );
}
