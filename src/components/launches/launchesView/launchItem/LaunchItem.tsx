import React from 'react'
import './launchItem.css'

import { Launch } from '../../../../types/launch'

interface LaunchItemProps {
    launch: Launch
}
interface LaunchItemState {
    launchDate: Date,
    windowStart: Date,
    windowEnd: Date
}

export default class LaunchItem extends React.Component<LaunchItemProps, LaunchItemState> {
    constructor(props: LaunchItemProps) {
        super(props)
        
        const launchDate = new Date(this.props.launch.netstamp * 1000)
        const windowStart = new Date(this.props.launch.windowstart)
        const windowEnd = new Date(this.props.launch.windowend)

        this.state = {
            launchDate: launchDate,
            windowStart: windowStart,
            windowEnd: windowEnd
        }
    }

    render() {
        const {launch} = this.props
        return <div className="launch-item-container">
            <div className="launch-item">
                <div 
                    className="image-container"
                    style={{
                        backgroundImage: `url(${launch.rocket.imageURL})`
                    }}
                >
                </div>
                <div className="launch-info">
                    <h2>{launch.name}</h2>
                    <p>{this.state.launchDate.toLocaleString('fr-FR', {hour12: false})}</p>
                    {
                        (-1 !== launch.probability)
                        ? <p>Probabilité : {launch.probability}%</p>
                        : <p>Probabilité : inconnue</p>
                    }
                    <p>Fenêtre de tir : {this.state.windowStart.toLocaleTimeString('fr-FR')} à {this.state.windowEnd.toLocaleTimeString('fr-FR')}</p>
                </div>
            </div>
        </div>
    }
}
