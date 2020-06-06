import React from 'react'
import './App.css'

import Launches from './components/launches/Launches'
import Launch from './components/launches/launch/Launch'
import { useParams } from 'react-router-dom'

interface AppProps {
    route: 'launches' | 'custom_launch'
}

const App: React.FC<AppProps> = ({route}: AppProps) => {
    const { id } = useParams()
    
    return <div id="app">
        <main>
            {
                route === 'launches'
                ? <Launches />
                : <Launch id={id} />
            }
        </main>
    </div>
}

export default App
