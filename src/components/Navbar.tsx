import { Link } from 'react-router-dom';
interface NavbarProps {
  userAnonymousName: string;
}
export default function Navbar(props:NavbarProps) {
    return (
        <header>
        <div className="navbar">
            <a href="/" className="logo">Pokémon</a>
            <nav>
                <ul>
                    <li>Welcome {props.userAnonymousName}</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    )
}
