import React from 'react'
import './launchItemPage.css'

import { Launch } from '../../../../types/launch'

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

    componentDidMount() {
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

    closePage(e: any) {
        e.stopPropagation()
        this.props.onCloseMoreInfoPage()
    }

    render() {
        const { launch } = this.props
        return <div
            id="launch-item-page-container"
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
                    <div>
                        <h3>Départ</h3>
                        <p className="date">
                            {
                                new Date(this.props.launch.netstamp * 1000).toLocaleString('fr-FR', {
                                    hour12: false,
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long'
                                })}
                                &nbsp;-&nbsp;
                                {
                                (
                                    new Date(this.props.launch.netstamp * 1000).toLocaleTimeString('fr-FR', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })
                                )
                            }
                            <span>&nbsp; UTC+1</span>
                        </p>
                    </div>
                    <div className="row">
                        <div>
                            <h3>Fenêtre de lancement</h3>
                            <p className="date">
                                {
                                    new Date(this.props.launch.windowstart).toLocaleString('fr-FR', {
                                        hour12: false,
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                    })}
                                &nbsp;-&nbsp;
                                {
                                    (
                                        new Date(this.props.launch.windowstart).toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                    )
                                }
                                <span>&nbsp; UTC+1</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;à&nbsp;&nbsp;&nbsp;&nbsp;
                                {
                                    new Date(this.props.launch.windowend).toLocaleString('fr-FR', {
                                        hour12: false,
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                    })}
                                &nbsp;-&nbsp;
                                {
                                    (
                                        new Date(this.props.launch.windowend).toLocaleTimeString('fr-FR', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })
                                    )
                                }
                                <span>&nbsp; UTC+1</span>
                            </p>
                        </div>
                    </div>
                </section>
                {
                    launch.missions[0] &&
                    <section>
                        <h2>Mission</h2>
                        <p>{launch.missions[0].description}</p>
                        <p>{launch.missions[0].name}</p>
                        <p>{launch.missions[0].typeName}</p>
                        <p>{launch.missions[0].wikiURL}</p>
                    </section>
                }
            </div>
            <div className="card-content">
                <section>
                    <h2>Départ</h2>
                    <p>countryCode</p>
                    <p>infoUrl</p>
                    <p>name</p>
                </section>
                <section>
                    <h2>Fusée</h2>
                    <p>InfoURL</p>
                    <p>InfoURLs</p>
                    <p>name</p>
                    <p>wikiURL</p>
                </section>
            </div>
            <div className="card-content">
                <section>
                    <h2>Agence</h2>
                    <p>abbrev</p>
                    <p>countryCode</p>
                    <p>InfoURL</p>
                    <p>InfoURLs</p>
                    <p>name</p>
                    <p>WikiURL</p>
                </section>
            </div>
        </div>
    }
}   