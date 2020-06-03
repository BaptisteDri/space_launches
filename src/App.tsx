import React from 'react'
import './App.css'

import Launches from './components/launches/Launches'

interface AppProps {
    route: 'launches' | 'rockets' | 'agencies'
}

const App: React.FC<AppProps> = ({route}: AppProps) => {
    return <div id="app">
        <main>
            <Launches />
        </main>
    </div>
}

export default App
