import { Link } from 'react-router-dom';

interface Props {
  links: string[];
}

export default function NavBar({ links }: Props) {
  return (
    <nav>
      <Link to="/">TOTM</Link>
      {links.map((link) => (
        <Link to={link} key={link}>
          {link}
        </Link>
      ))}
    </nav>
  );
}
