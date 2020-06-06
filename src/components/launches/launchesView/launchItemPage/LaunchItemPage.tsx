import React from 'react'
import './launchItemPage.css'

import { Launch } from '../../../../types/launch'
import UrlToCta from '../../../urlToCta/UrlToCta'

import { findFlagUrlByIso3Code } from "country-flags-svg"


export interface LaunchItemPageProps {
    launch: Launch
    onCloseMoreInfoPage: () => void
}
export interface LaunchItemPageState {
    countDown: CountDown
    countDownTimestamp: number
}

interface CountDown {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export default class LaunchItemPage extends React.Component<LaunchItemPageProps, LaunchItemPageState> {
    countries = require('../../../../iso3ToCountryNames.json')

    constructor(props: LaunchItemPageProps) {
        super(props)

        const timestamp = (this.props.launch.netstamp && this.props.launch.netstamp > 0)
            ? ((this.props.launch.netstamp) - (Date.now() / 1000))
            : ((new Date(this.props.launch.net).getTime() / 1000) - (Date.now() / 1000))

        const days = Math.floor(timestamp / (24 * 60 * 60))
        const hours = Math.floor(timestamp / (60 * 60) % 24)
        const minutes = Math.floor(timestamp / 60) % 60
        const seconds = Math.floor(timestamp / 1) % 60

        this.state = {
            countDownTimestamp: timestamp,
            countDown: {
                days,
                hours,
                minutes,
                seconds
            }
        }
    }

    componentWillUnmount() {
        this.closePage()
    }

    componentDidMount() {
        console.log(this.props.launch)
        setInterval(() => {
            if (this.state.countDownTimestamp > 0) {
                this.setState(prevState => ({
                    countDownTimestamp: prevState.countDownTimestamp - 1
                }))
            }
            const days = Math.floor(this.state.countDownTimestamp / (24 * 60 * 60))
            const hours = Math.floor(this.state.countDownTimestamp / (60 * 60) % 24)
            const minutes = Math.floor(this.state.countDownTimestamp / 60) % 60
            const seconds = Math.floor(this.state.countDownTimestamp / 1) % 60
            this.setState({
                countDown: {
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                }
            })
        }, 1000)
    }

    closePage(e?: any) {
        e && e.stopPropagation()
        this.props.onCloseMoreInfoPage()
    }

    render() {
        const { launch } = this.props
        return <div
            id="launch-item-page-container"
            className={launch.rocket.imageURL !== 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png' && typeof launch.rocket.imageURL === 'string' && launch.rocket.imageURL.includes('://') ? '' : 'no-bg'}
            style={
                (launch.rocket.imageURL !== 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png' && typeof launch.rocket.imageURL === 'string' && launch.rocket.imageURL.includes('://'))
                    ? { backgroundImage: `url(${launch.rocket.imageURL})` }
                    : {}
            }
        >
            <div className="card-header">
                <button onClick={e => this.closePage(e)}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
                </button>
            </div>
            <div className="card-content">
                <h1>{launch.name}</h1>
                <div className="countdown">
                    <div className="days">
                        <span>
                            {this.state.countDown.days > 9 ? this.state.countDown.days : '0' + this.state.countDown.days}
                        </span>
                        <span>JOURS</span>
                    </div>
                    <div className="separator">:</div>
                    <div className="hours">
                        <span>
                            {this.state.countDown.hours > 9 ? this.state.countDown.hours : '0' + this.state.countDown.hours}
                        </span>
                        <span>HEURES</span>
                    </div>
                    <div className="separator">:</div>
                    <div className="minutes">
                        <span>
                            {this.state.countDown.minutes > 9 ? this.state.countDown.minutes : '0' + this.state.countDown.minutes}
                        </span>
                        <span>MINUTES</span>
                    </div>
                    <div className="separator">:</div>
                    <div className="seconds">
                        <span>
                            {this.state.countDown.seconds > 9 ? this.state.countDown.seconds : '0' + this.state.countDown.seconds}
                        </span>
                        <span>SECONDES</span>
                    </div>
                </div>

                <section>
                    <h2>Horaires</h2>
                    <div className="row">
                        <div className="date">
                            <h3>Début de la fenêtre de lancement</h3>
                            <span className="day">
                                {
                                    new Date(this.props.launch.windowstart).toLocaleString('fr-FR', {
                                        hour12: false,
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                    })
                                }
                            </span>
                            <span className="hours">
                                {
                                    (
                                        new Date(this.props.launch.windowstart).toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                    )
                                }
                            </span>
                            <span className="utc">UTC+1</span>
                        </div>
                        <div className="date">
                            <h3>Horaire initial de lancement</h3>
                            <span className="day">
                                {
                                    new Date(this.props.launch.netstamp * 1000).toLocaleString('fr-FR', {
                                        hour12: false,
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                    })
                                }
                            </span>
                            <span className="hours">
                                {
                                    (
                                        new Date(this.props.launch.netstamp * 1000).toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                    )
                                }
                            </span>
                            <span className="utc">UTC+1</span>
                        </div>
                        <div className="date">
                            <h3>Fin de la fenêtre de lancement</h3>
                            <span className="day">
                                {
                                    new Date(this.props.launch.windowend).toLocaleString('fr-FR', {
                                        hour12: false,
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                    })
                                }
                            </span>
                            <span className="hours">
                                {
                                    (
                                        new Date(this.props.launch.windowend).toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                    )
                                }
                            </span>
                            <span className="utc">UTC+1</span>
                        </div>
                    </div>
                </section>
            </div>
            <div className="card-content">
                {
                    launch.missions[0] &&
                    <section>
                        <h2>Mission</h2>
                        <div className="row">
                            {
                                launch.missions.map((mission, i) => (
                                    <div key={i} className="section-container">
                                        <p className="mission-name">{mission.name}</p>
                                        <p className="mission-type">{mission.typeName}</p>
                                        <p className="mission-desc">{mission.description}</p>
                                        {
                                            mission.wikiURL.length > 0 &&
                                            <p className="mission-wiki">
                                                <UrlToCta url={mission.wikiURL} />
                                            </p>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </section>
                }
                <section>
                    <h2>Départ</h2>
                    <div className="custom-section-container">
                        <p
                            className="country-flag"
                            style={{ backgroundImage: findFlagUrlByIso3Code(launch.location.countryCode) ? `url(${findFlagUrlByIso3Code(launch.location.countryCode)})` : `` }}
                        >
                        </p>
                        <p className="country-name">{this.countries[launch.location.countryCode]}</p>
                        <p className="country-location-name">{launch.location.name}</p>
                        <div className="links">
                            <UrlToCta url={`https://www.google.com/maps/search/${launch.location.name}`} />
                            {
                                (launch.location.pads && launch.location.pads[0].wikiURL.length > 0) &&
                                <UrlToCta url={launch.location.pads[0].wikiURL} />
                            }
                        </div>
                    </div>
                </section>
            </div>
            <div className="card-content">
                <section>
                    <h2>Fusée</h2>
                    <div className="custom-section-container">
                        <p
                            className="rocket-img"
                            style={
                                (launch.rocket.imageURL !== 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png' && typeof launch.rocket.imageURL === 'string' && launch.rocket.imageURL.includes('://'))
                                    ? { backgroundImage: `url(${launch.rocket.imageURL})` }
                                    : { backgroundImage: `url(${process.env.PUBLIC_URL}/rocket_image_placeholder.svg)`, backgroundSize: 'contain' }
                            }
                        >
                        </p>
                        <p className="rocket-name">
                            {launch.rocket.name}
                        </p>
                        <p className="rocket-agency">
                            {launch.rocket.agencies && launch.rocket.agencies[0] && launch.rocket.agencies[0].name}
                        </p>
                        <div className="links">
                            {launch.rocket.wikiURL.length > 0 && <UrlToCta url={launch.rocket.wikiURL} />}
                            {
                                (launch.rocket.infoURLs && launch.rocket.infoURLs.length > 0) 
                                    ? launch.rocket.infoURLs.map((infoURL: any, i: number) => <UrlToCta key={i} url={infoURL} />) 
                                    : launch.rocket.infoURL && <UrlToCta url={launch.rocket.infoURL} />
                            }
                        </div>
                    </div>
                </section>
                {
                    launch.rocket.agencies && launch.rocket.agencies[0] &&
                    <section>
                        <h2>Agence</h2>
                        {
                            launch.rocket.agencies && launch.rocket.agencies.map((agency, i) => (
                                <div key={i} className="custom-section-container">
                                    <p
                                        className="country-flag"
                                        style={{ backgroundImage: findFlagUrlByIso3Code(agency.countryCode) ? `url(${findFlagUrlByIso3Code(agency.countryCode)})` : `` }}
                                    ></p>
                                    <p className="country-name">{this.countries[agency.countryCode]}</p>
                                    <p className="country-location-name">{agency.abbrev}</p>
                                    <div className="links">
                                        {agency.wikiURL && <UrlToCta url={agency.wikiURL} />}
                                        {agency.infoURLs.length > 0 ? agency.infoURLs.map((infoURL: any, i: number) => <UrlToCta key={i} url={infoURL} />) : agency.infoURL.length > 0 && <UrlToCta url={agency.infoURL} />}
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                }
            </div>
        </div>
    }
}   