import React from 'react'
import './launchItem.css'

import { Launch } from '../../../../types/launch'
import { Link } from 'react-router-dom'

const countries = require('../../../../iso3ToCountryNames.json')

interface LaunchItemProps {
    launch: Launch
}
interface LaunchItemState { }

export default class LaunchItem extends React.Component<LaunchItemProps, LaunchItemState> {
    render() {
        const { launch } = this.props
        return <div className="launch-item-container">
            <div className="launch-item">
                <div
                    className="image-container"
                    style={
                        (launch.rocket.imageURL !== 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png' && typeof launch.rocket.imageURL === 'string' && launch.rocket.imageURL.includes('://'))
                        ? { backgroundImage: `url(${launch.rocket.imageURL})` }
                        : { backgroundImage: `url(${process.env.PUBLIC_URL}/rocket_image_placeholder.svg)` }
                    }
                >
                </div>
                <div className="launch-info">
                    <h2>{launch.name.replace(/ *\([^)]*\) */g, "")}</h2>
                    <p>
                        <span className="date">
                            {new Date(this.props.launch.netstamp * 1000).toLocaleString('fr-FR', {
                                hour12: false,
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                            })}
                            &nbsp;-&nbsp;
                            {(new Date(this.props.launch.netstamp * 1000).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}))}<span>&nbsp; UTC+1</span> 
                        </span>
                    </p>
                    {
                        launch.rocket && launch.rocket.agencies &&  launch.rocket.agencies.length > 0 && launch.rocket.agencies[0].name.length > 15 &&
                        <Link to=""><span>Agence - </span>{launch.rocket.agencies[0].abbrev} ({countries[launch.rocket.agencies[0].countryCode]})</Link> // TODO : Replace by a link to the agency item page
                    }
                    {
                        launch.rocket && launch.rocket.agencies &&  launch.rocket.agencies.length > 0 && launch.rocket.agencies[0].name.length <= 15 &&
                        <Link to=""><span>Agence - </span>{launch.rocket.agencies[0].name} ({countries[launch.rocket.agencies[0].countryCode]})</Link> // TODO : Replace by a link to the agency item page
                    }
                    <Link to="">
                        <span>Fusée - </span>
                        {launch.rocket.name}
                    </Link>
                </div>
            </div>
        </div>
    }
}
