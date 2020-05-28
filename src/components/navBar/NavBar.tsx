import * as React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

const NavBar: React.FC = () => {
    return <nav>
        <ul>
            <li>
                <Link to="/fusees">Fusées</Link>
            </li>
            <li>
                <Link to="/lancements">Lancements</Link>
            </li>
            <li>
                <Link to="/agences-spatiales">Agences spatiales</Link>
            </li>
        </ul>
    </nav>
}

export default NavBar