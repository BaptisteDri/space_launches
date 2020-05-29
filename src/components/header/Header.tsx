import React from 'react'
import './header.css'

interface HeaderProps {
    h1: string
}

const Header: React.FC<HeaderProps> = ({ h1 }: HeaderProps) => {
    return <header>
        <h1>{h1}</h1>
        <div className="author-credits">
            <span>
                Remerciements <a href="https://launchlibrary.net" target="_blank" rel="noopener noreferrer">Launch library</a>&nbsp;🛰️
            </span>
            <span>
                Fait par <a href="https://www.baptiste-drillien.com" target="_blank" rel="noopener noreferrer">Baptiste Drillien</a>&nbsp;🚀
            </span>
        </div>
    </header>
}

export default Header