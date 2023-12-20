import { Link, useNavigate } from 'react-router-dom';

import '../styles/navBar.css';

interface Props {
  links: string[];
}

export default function NavBar({ links }: Props): React.ReactNode {
  const navigate = useNavigate();

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
    </nav>
  );
}
