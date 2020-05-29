import React from 'react'

import LaunchesView from './launchesView/LaunchesView'

import { Launch } from '../../types/launch'

interface LaunchesProps {}
interface LaunchesState {
    isLoaded: boolean
    launches?: Launch[]
    displayedLaunches?: Launch[]
}

export default class Launches extends React.Component<LaunchesProps, LaunchesState> {
    constructor(props: LaunchesProps) {
        super(props)

        this.state = {
            isLoaded: false,
            launches: undefined,
            displayedLaunches: []
        }

        this.handleSearchFiltering = this.handleSearchFiltering.bind(this)
    }
    componentDidMount() {
        fetch('https://launchlibrary.net/1.4/launch?next=60&mode=verbose')
        .then(res => res.json())
        .then(result => {
            
            this.setState({
                isLoaded: true,
                launches: result.launches,
                displayedLaunches: result.launches
            }, () => console.log(this.state.launches))
        }, error => {
            console.error('something went wrong while fetching data')

        })
    }

    handleSearchFiltering(filter: string) {
        filter = filter.toUpperCase()
        const launches = this.state.launches
        const displayedLaunches = launches?.filter(launch => {
            if (launch.name.toUpperCase().includes(filter)) {
                return true
            } else if(launch.rocket.name.toUpperCase().includes(filter)) {
                return true
            } else if (launch.rocket.agencies && launch.rocket.agencies[0] && launch.rocket.agencies[0].name.toUpperCase().includes(filter)) {
                return true
            } else if (launch.rocket.agencies && launch.rocket.agencies[0] && launch.rocket.agencies[0].abbrev.toUpperCase().includes(filter)) {
                return true
            } else {
                return false
            }
        })
        this.setState({ displayedLaunches })
    }

    render() {
        return <LaunchesView 
            isLoaded={this.state.isLoaded}
            launches={this.state.displayedLaunches}
            onSearchFiltering={this.handleSearchFiltering}
        />
    }
}