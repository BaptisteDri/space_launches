import React from 'react'
import './App.css'

import NavBar from './components/navBar/NavBar'
import Launches from './components/launches/Launches'
import Agencies from './components/agencies/Agencies'
import Rockets from './components/rockets/Rockets'

interface AppProps {
    route: 'launches' | 'rockets' | 'agencies'
}

const App: React.FC<AppProps> = ({route}: AppProps) => {
    return <div id="app">
        <main>
            {
                route === 'launches' &&
                <Launches />
            }
            {
                route === 'rockets' &&
                <Rockets />
            }
            {
                route === 'agencies' &&
                <Agencies />
            }
        </main>
        <NavBar />
    </div>
}

export default App
