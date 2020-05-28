import React from 'react'
import './launchItem.css'

import { Launch } from '../../../../types/launch'

const countries = require('../../../../iso3ToCountryNames.json')

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
        const { launch } = this.props
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
                    <p>
                        <span>
                            {this.state.launchDate.toLocaleString('fr-FR', {
                                hour12: false,
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                            })}
                        </span>
                        &nbsp;-&nbsp;
                        <span>
                            {this.state.launchDate.toLocaleTimeString('fr-FR')}
                        </span>
                    </p>
                    {
                        launch.rocket && launch.rocket.agencies &&  launch.rocket.agencies.length > 0 && launch.rocket.agencies[0].name.length > 10 &&
                        <p>{launch.rocket.agencies[0].abbrev} ({countries[launch.rocket.agencies[0].countryCode]})</p> // TODO : Replace by a link to the agency item page
                    }
                    {
                        launch.rocket && launch.rocket.agencies &&  launch.rocket.agencies.length > 0 && launch.rocket.agencies[0].name.length <= 10 &&
                        <p>{launch.rocket.agencies[0].name} ({countries[launch.rocket.agencies[0].countryCode]})</p> // TODO : Replace by a link to the agency item page
                    }
                    <p>{countries[launch.location.countryCode]}</p>
                </div>
            </div>
        </div>
    }
}
