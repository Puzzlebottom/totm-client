import { Link, useNavigate } from 'react-router-dom';

import '../styles/navBar.css';
import { useMutation } from '@apollo/client';
import { useAuth } from '../providers/AuthProvider';
import userRequests from '../api/userRequests';

interface Props {
  links: string[];
}

export default function NavBar({ links }: Props): React.ReactNode {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [logoutUser] = useMutation(userRequests.LOGOUT);

  const logout = async () => {
    logoutUser();
    setToken(null);
    navigate('/login');
  };

  const authenicated = (
    <span>
      <div>Logged in as: {token}</div>
      <button
        type="button"
        aria-label="logout"
        className="button-primary-outline"
        onClick={() => logout()}
      >
        Logout
      </button>
    </span>
  );

  const unauthenticated = (
    <span>
      <button
        type="button"
        aria-label="login"
        className="button-primary-outline"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
      <button
        type="button"
        aria-label="register"
        className="button-primary-outline"
        onClick={() => navigate('/register')}
      >
        Register
      </button>
    </span>
  );

  return (
    <nav className="navbar" aria-label="main">
      <Link to="/" className="navbar-brand">
        TOTM
      </Link>
      <span>
        {links.map((link) => (
          <Link key={link} to={link} className="nav-link">
            {link}
          </Link>
        ))}
      </span>
      {token ? authenicated : unauthenticated}
    </nav>
  );
}
