import React from 'react'
import './App.css'

import NavBar from './components/navBar/NavBar'
import Launches from './components/launches/Launches'

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
                    <h1>En cours de développement</h1>
                }
                {
                    route === 'agencies' &&
                    <h1>En cours de développement</h1>
                }
            </main>
        <NavBar />
    </div>
}

export default App
