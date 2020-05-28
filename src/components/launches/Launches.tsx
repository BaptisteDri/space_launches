import React from 'react'

import LaunchesView from './launchesView/LaunchesView'

import { Launch } from '../../types/launch'

interface LaunchesProps {}
interface LaunchesState {
    isLoaded: boolean
    launches?: Launch[]
}

export default class Launches extends React.Component<LaunchesProps, LaunchesState> {
    constructor(props: LaunchesProps) {
        super(props)

        this.state = {
            isLoaded: false,
            launches: undefined
        }
    }

    componentDidMount() {
        fetch('https://launchlibrary.net/1.4/launch?next=3&mode=verbose')
        .then(res => res.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                launches: result.launches
            }, () => console.log(this.state.launches))
        }, error => {
            console.error('something went wrong while fetching data')
        })
    }

    render() {
        return <LaunchesView 
            isLoaded={this.state.isLoaded}
            launches={this.state.launches}
        />
    }
}