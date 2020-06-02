import React from 'react'

import AgenciesView from './agenciesView/AgenciesView'
import { OrderedAgencies } from '../../types/agency'

import { groupAgenciesByCountries } from '../../util/groupAgenciesByCountires'

interface AgenciesViewProps {}
interface AgenciesViewState {
    isLoaded: boolean
    displayedAgencies?: OrderedAgencies[]
}

export default class Agencies extends React.Component<AgenciesViewProps, AgenciesViewState> {
    
    constructor(props: AgenciesViewProps) {
        super(props)

        this.state = {
            isLoaded: false
        }
    }
    
    componentDidMount() {
        fetch('https://launchlibrary.net/1.4/lsp')
        .then(res => res.json())
        .then(result => {
            const orderedAgencies = groupAgenciesByCountries(result.agencies)
            this.setState({
                isLoaded: true,
                displayedAgencies: orderedAgencies
            })
        }, error => {
            console.error('something went wrong while fetching data')
        })
    }

    render() {
        return <AgenciesView 
            isLoaded={this.state.isLoaded}
            agencies={this.state.displayedAgencies}
        />
    }
}