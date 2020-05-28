import React from 'react'
import './launchesView.css'

import { Launch } from '../../../types/launch'
import LaunchItem from './launchItem/LaunchItem'

interface LaunchesViewProps {
    isLoaded: boolean
    launches?: Launch[]
}
interface LaunchesViewState { }

export default class LaunchesView extends React.Component<LaunchesViewProps, LaunchesViewState> {
    render() {
        return <section id="launches">
            <h1>&nbsp;&nbsp;Calendrier des lancements</h1>
            <div className="author-credits">
                Fait par <a href="https://www.baptiste-drillien.com" target="_blank" rel="noopener noreferrer">Baptiste Drillien</a>
                &nbsp;🚀
            </div>
            <div className="launches-list">

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
                                this.props.launches?.map((launch, i) => {
                                    return <LaunchItem key={i} launch={launch} />
                                })
                            }
                        </div>
                }
            </div>
        </section>
    }
}
