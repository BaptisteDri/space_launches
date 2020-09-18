import React from 'react'
import './launchItemPage.css'

import { Launch } from '../../../../types/launch'
import UrlToCta from '../../../urlToCta/UrlToCta'

import { findFlagUrlByIso3Code } from "country-flags-svg"


export interface LaunchItemPageProps {
    launch?: Launch
    isLoaded: boolean
}
export interface LaunchItemPageState {
    countDown?: CountDown
    countDownTimestamp?: number
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

        this.state = {}
    }

    componentDidUpdate() {
        if (this.props.launch && this.state.countDownTimestamp === undefined) {
            console.log(this.state.countDownTimestamp)
            const timestamp = (this.props.launch.netstamp && this.props.launch.netstamp > 0)
                ? ((this.props.launch.netstamp) - (Date.now() / 1000))
                : ((new Date(this.props.launch.net).getTime() / 1000) - (Date.now() / 1000))

                this.setState({
                    countDownTimestamp: timestamp
                }, () => {
                    setInterval(() => {
                        if (this.state.countDownTimestamp && this.state.countDownTimestamp > 0) {
                            this.setState(prevState => ({
                                countDownTimestamp: prevState.countDownTimestamp && prevState.countDownTimestamp - 1
                            }))
                        }
                        const countDownTimestamp = this.state.countDownTimestamp ? this.state.countDownTimestamp : 0
                        const days = Math.floor(countDownTimestamp / (24 * 60 * 60))
                        const hours = Math.floor(countDownTimestamp / (60 * 60) % 24)
                        const minutes = Math.floor(countDownTimestamp / 60) % 60
                        const seconds = Math.floor(countDownTimestamp / 1) % 60
                        this.setState({
                            countDown: {
                                days: days,
                                hours: hours,
                                minutes: minutes,
                                seconds: seconds
                            }
                        })
                    }, 1000)
                })
        }
    }



    render() {
        return <div>
            {
                this.props.isLoaded
                    ? <div>
                        {
                            this.props.launch && <div>
                                <div
                                    id="launch-item-page-container"
                                    className={this.props.launch.rocket.imageURL !== 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png' && typeof this.props.launch.rocket.imageURL === 'string' && this.props.launch.rocket.imageURL.includes('://') ? '' : 'no-bg'}
                                >
                                    <div 
                                        className="card-header"
                                        style={
                                            (this.props.launch.rocket.imageURL !== 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png' && typeof this.props.launch.rocket.imageURL === 'string' && this.props.launch.rocket.imageURL.includes('://'))
                                                ? { backgroundImage: `url(${this.props.launch.rocket.imageURL})` }
                                                : { backgroundImage: `url(${process.env.PUBLIC_URL}/rocket_image_placeholder.svg)`, backgroundSize: 'contain', backgroundPosition: 'center'}
                                        }
                                    >
                                        <button onClick={e => window.location.href = `${process.env.PUBLIC_URL}/`}>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
                                        </button>
                                    </div>
                                    <div className="card-content">
                                        <h1>{this.props.launch.name}</h1>
                                        {
                                            this.state.countDown
                                                ? <div className="countdown">
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
                                                : <div className="loader">
                                                    <span className="elem"></span>
                                                    <span className="elem"></span>
                                                    <span className="elem"></span>
                                                    <span className="elem"></span>
                                                    <span className="elem"></span>
                                                    <span className="elem"></span>
                                                    <span className="elem"></span>
                                                </div>
                                        }

                                        {
                                                ((
                                                    new Date(this.props.launch.windowstart).toLocaleTimeString('fr-FR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                !==
                                                (
                                                    new Date(this.props.launch.windowend).toLocaleTimeString('fr-FR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                ))
                                                &&
                                                <section className="schedule">
                                                    <h2>Fenêtre de lancement</h2>
                                                    <div className="schedules">
                                                        <div>
                                                            <span className="label">Début</span>
                                                            <span className="info">
                                                                {
                                                                    (
                                                                        new Date(this.props.launch.windowstart).toLocaleTimeString('fr-FR', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })
                                                                    )
                                                                }
                                                            </span>
                                                            <span className="timezone">UTC+1</span>
                                                        </div>
                                                        <div>
                                                            <span className="label">Lancement</span>
                                                            <span className="info">
                                                                {
                                                                    (
                                                                        new Date(this.props.launch.netstamp * 1000).toLocaleTimeString('fr-FR', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })
                                                                    )
                                                                }
                                                            </span>
                                                            <span className="timezone">UTC+1</span>
                                                        </div>
                                                        <div>
                                                            <span className="label">Fin</span>
                                                            <span className="info">
                                                                {
                                                                    (
                                                                        new Date(this.props.launch.windowend).toLocaleTimeString('fr-FR', {
                                                                            hour: '2-digit',
                                                                            minute: '2-digit'
                                                                        })
                                                                    )
                                                                }
                                                            </span>
                                                            <span className="timezone">UTC+1</span>
                                                        </div>
                                                    </div>
                                                </section>       
                                            )
                                        }

                                        {
                                            this.props.launch.rocket.agencies && this.props.launch.rocket.agencies[0] &&
                                            <section className="agency">
                                                <h2>
                                                    {
                                                        this.props.launch.rocket.agencies.length > 1
                                                        ? 'Agences'
                                                        : 'Agence'
                                                    }
                                                </h2>
                                                {
                                                    this.props.launch.rocket.agencies && this.props.launch.rocket.agencies.map((agency, i) => (
                                                        <div key={i} className="agency-item">
                                                            <p
                                                                className="country-flag"
                                                                style={{ backgroundImage: findFlagUrlByIso3Code(agency.countryCode) ? `url(${findFlagUrlByIso3Code(agency.countryCode)})` : `` }}
                                                            ></p>
                                                            <p className="agency-name">{agency.name}</p>
                                                            <p className="country-name">{this.countries[agency.countryCode]}</p>
                                                            <div className="links">
                                                                {agency.wikiURL && <UrlToCta url={agency.wikiURL} />}
                                                                {agency.infoURLs.length > 0 ? agency.infoURLs.map((infoURL: any, i: number) => <UrlToCta key={i} url={infoURL} />) : agency.infoURL.length > 0 && <UrlToCta url={agency.infoURL} />}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </section>
                                        }

                                        {
                                            this.props.launch && this.props.launch.missions && this.props.launch.missions[0] &&
                                            <section className="mission">
                                                <h2>
                                                    {
                                                        this.props.launch.missions.length > 1
                                                        ? 'Missions'
                                                        : 'Mission'
                                                    }
                                                </h2>
                                                {
                                                    this.props.launch.missions.map((mission, i) => (
                                                        <article key={i} className="mission-item">
                                                            <h3>{mission.name}</h3>
                                                            <span>{mission.typeName}</span>
                                                            <p className="desc">{mission.description}</p>
                                                            {
                                                                mission.wikiURL.length > 0 &&
                                                                <p className="mission-wiki">
                                                                    <UrlToCta url={mission.wikiURL} />
                                                                </p>
                                                            }
                                                        </article>
                                                    ))
                                                }
                                            </section>
                                        }
                                        

                                    </div>
                                    <div className="card-content">
                                        <section>
                                            <h2>Départ</h2>
                                            <div className="custom-section-container">
                                                <p
                                                    className="country-flag"
                                                    style={{ backgroundImage: findFlagUrlByIso3Code(this.props.launch.location.countryCode) ? `url(${findFlagUrlByIso3Code(this.props.launch.location.countryCode)})` : `` }}
                                                >
                                                </p>
                                                <p className="country-name">{this.countries[this.props.launch.location.countryCode]}</p>
                                                <p className="country-location-name">{this.props.launch.location.name}</p>
                                                <div className="links">
                                                    <UrlToCta url={`https://www.google.com/maps/search/${this.props.launch.location.name}`} />
                                                    {
                                                        (this.props.launch.location.pads && this.props.launch.location.pads[0] && this.props.launch.location.pads[0].wikiURL && this.props.launch.location.pads[0].wikiURL.length > 0) &&
                                                        <UrlToCta url={this.props.launch.location.pads[0].wikiURL} />
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
                                                        (this.props.launch.rocket.imageURL !== 'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png' && typeof this.props.launch.rocket.imageURL === 'string' && this.props.launch.rocket.imageURL.includes('://'))
                                                            ? { backgroundImage: `url(${this.props.launch.rocket.imageURL})` }
                                                            : { backgroundImage: `url(${process.env.PUBLIC_URL}/rocket_image_placeholder.svg)`, backgroundSize: 'contain' }
                                                    }
                                                >
                                                </p>
                                                <p className="rocket-name">
                                                    {this.props.launch.rocket.name}
                                                </p>
                                                <p className="rocket-agency">
                                                    {this.props.launch.rocket.agencies && this.props.launch.rocket.agencies[0] && this.props.launch.rocket.agencies[0].name}
                                                </p>
                                                <div className="links">
                                                    {this.props.launch.rocket.wikiURL.length > 0 && <UrlToCta url={this.props.launch.rocket.wikiURL} />}
                                                    {
                                                        (this.props.launch.rocket.infoURLs && this.props.launch.rocket.infoURLs.length > 0)
                                                            ? this.props.launch.rocket.infoURLs.map((infoURL: any, i: number) => <UrlToCta key={i} url={infoURL} />)
                                                            : this.props.launch.rocket.infoURL && <UrlToCta url={this.props.launch.rocket.infoURL} />
                                                    }
                                                </div>
                                            </div>
                                        </section>
                                        {
                                            this.props.launch.rocket.agencies && this.props.launch.rocket.agencies[0] &&
                                            <section>
                                                <h2>Agence</h2>
                                                {
                                                    this.props.launch.rocket.agencies && this.props.launch.rocket.agencies.map((agency, i) => (
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
                            </div>
                        }
                    </div>
                    : <div className="loader">
                        <span className="elem"></span>
                        <span className="elem"></span>
                        <span className="elem"></span>
                        <span className="elem"></span>
                        <span className="elem"></span>
                        <span className="elem"></span>
                        <span className="elem"></span>
                    </div>
            }
        </div>
    }
}   