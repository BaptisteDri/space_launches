import React from 'react'

import RocketsView from './rocketsView/RocketsView'
import { Rocket } from '../../types/rocket'

interface RocketsViewProps {}
interface RocketsViewState {
    isLoaded: boolean
    displayedRockets?: Rocket[]
}

export default class Rockets extends React.Component<RocketsViewProps, RocketsViewState> {
    
    constructor(props: RocketsViewProps) {
        super(props)

        this.state = {
            isLoaded: false
        }
    }
    
    componentDidMount() {
        fetch('https://launchlibrary.net/1.4/rocket?mode=verbose')
        .then(res => res.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                displayedRockets: result.rockets
            }, () => console.log(this.state.displayedRockets))
        }, error => {
            console.error('something went wrong while fetching data')
        })
    }

    render() {
        return <RocketsView 
            isLoaded={this.state.isLoaded}
            rockets={this.state.displayedRockets}
        />
    }
}