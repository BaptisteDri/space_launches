import React from 'react'
import './rocketsView.css'

import Header from '../../header/Header'
import { Rocket } from '../../../types/rocket'
import RocketItem from './rocketItem/RocketItem'

interface LaunchesViewProps {
    isLoaded: boolean
    rockets?: Rocket[]
}
interface LaunchesViewState { }

export default class LaunchesView extends React.Component<LaunchesViewProps, LaunchesViewState> {
    render() {
        return <section id="rockets">
            <Header h1="Fusées" />
            <div className="rockets-list">
                {
                    !this.props.isLoaded
                        ? <div className="loader">
                            <span className="elem"></span>
                            <span className="elem"></span>
                            <span className="elem"></span>
                            <span className="elem"></span>
                            <span className="elem"></span>
                            <span className="elem"></span>
                            <span className="elem"></span>
                        </div>
                        : <div>
                            {
                                this.props.rockets?.map((rocket, i) => (
                                    <RocketItem key={i} rocket={rocket} />
                                ))
                            }
                        </div>
                }
            </div>
        </section>
    }
}
