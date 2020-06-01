import React from 'react'

import LaunchesView from './launchesView/LaunchesView'

import { OrderedLaunches, Launch } from '../../types/launch'

import { groupLaunchesByMonth } from '../../util/groupLaunchesByMonth'

interface LaunchesProps {}
interface LaunchesState {
    isLoaded: boolean
    displayedLaunches?: OrderedLaunches[]
}

let launches: any

export default class Launches extends React.Component<LaunchesProps, LaunchesState> {
    
    constructor(props: LaunchesProps) {
        super(props)

        this.state = {
            isLoaded: false
        }

        this.handleSearchFiltering = this.handleSearchFiltering.bind(this)
    }
    
    componentDidMount() {
        fetch('https://launchlibrary.net/1.4/launch?next=5&mode=verbose')
        .then(res => res.json())
        .then(result => {
            const orderedLaunches = groupLaunchesByMonth(result.launches)
            launches = result.launches
            this.setState({
                isLoaded: true,
                displayedLaunches: orderedLaunches
            })
        }, error => {
            console.error('something went wrong while fetching data')
        })
    }

    handleSearchFiltering(filter: string) {
        filter = filter.toUpperCase()
        let displayedLaunches = launches?.filter((launch: Launch) => {
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
        displayedLaunches = groupLaunchesByMonth(displayedLaunches)
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