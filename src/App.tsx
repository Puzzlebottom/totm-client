import AuthProvider from './providers/AuthProvider';
import GraphQLProvider from './providers/GraphQLProvider';
import Routes from './providers/RouterProvider';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <GraphQLProvider>
        <Routes />
      </GraphQLProvider>
    </AuthProvider>
  );
}

export default App;
