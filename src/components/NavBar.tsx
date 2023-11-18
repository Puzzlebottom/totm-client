import { Link } from 'react-router-dom';

import '../styles/navBar.css';

interface Props {
  links: string[];
}

export default function NavBar({ links }: Props): React.ReactNode {
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
        >
          Login
        </button>
        <button
          type="button"
          aria-label="register"
          className="button-primary-outline"
        >
          Register
        </button>
      </span>
    </nav>
  );
}
