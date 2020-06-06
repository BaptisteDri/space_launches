import React from 'react'

import LaunchItemPage from './launchItemPage/LaunchItemPage'

import { Launch } from '../../../types/launch'

interface LaunchProps {
    id: number
}
interface LaunchState {
    isLoaded: boolean
    launch?: Launch
}

export default class LaunchItem extends React.Component<LaunchProps, LaunchState> {
    
    constructor(props: LaunchProps) {
        super(props)

        this.state = {
            isLoaded: false
        }
    }
    
    componentDidMount() {
        fetch(`https://launchlibrary.net/1.4/launch/${this.props.id}`)
        .then(res => res.json())
        .then(result => {
            this.setState({
                isLoaded: true,
                launch: result.launches[0]
            })
        }, error => {
            console.error('something went wrong while fetching data')
        })
    }
    
    render() {
        return <LaunchItemPage 
            isLoaded={this.state.isLoaded}
            launch={this.state.launch}
        />
    }
}