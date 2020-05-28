import React from 'react'
import './App.css'

import NavBar from './components/navBar/NavBar'
import LaunchesView from './components/launches/launchesView/LaunchesView'

interface AppProps {
    route: 'launches' | 'rockets' | 'agencies'
}

const App: React.FC<AppProps> = ({route}: AppProps) => {
    return <div>    
        <main>
            {route}
            {/* {
                route === 'launches' &&
                <LaunchesView />
            }
            {
                route === 'rockets' &&
                <div>LISTE DES FUSEES</div>
            }
            {
                route === 'agencies' &&
                <div>LISTE DES AGENCES SPATIALES</div>
            } */}
        </main>
        <NavBar />
    </div>
}

export default App
