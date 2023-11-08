import { Link } from 'react-router-dom';

interface Props {
  links: string[];
}

export default function NavBar({ links }: Props): React.ReactNode {
  return (
    <nav>
      <h2>
        <Link to="/">TOTM</Link>
      </h2>
      <ul>
        {links.map((link) => (
          <li key={link}>
            <Link to={link}>{link}</Link>
          </li>
        ))}
      </ul>
      <ul>
        <li>
          <button type="button" className="outline">
            Login
          </button>
        </li>
        <li>
          <button type="button" className="outline">
            Register
          </button>
        </li>
      </ul>
    </nav>
  );
}
