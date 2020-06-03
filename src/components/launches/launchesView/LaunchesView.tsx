import React from 'react'
import './launchesView.css'

import { OrderedLaunches } from '../../../types/launch'
import LaunchItem from './launchItem/LaunchItem'
import Header from '../../header/Header'
import SearchInput from '../../searchInput/SearchInput'

interface LaunchesViewProps {
    isLoaded: boolean
    launches?: OrderedLaunches[]
    onSearchFiltering: (filter: string) => void
}
interface LaunchesViewState {}

export default class LaunchesView extends React.Component<LaunchesViewProps, LaunchesViewState> {
    render() {
        return <section id="launches">
            <Header h1="Calendrier des lancements à venir" />
            <SearchInput onSearchFiltering={this.props.onSearchFiltering} />
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
                                this.props.launches?.map((launchGroup, i) => (
                                    <div key={i}>
                                        <div className="month-name">{launchGroup.month}</div>
                                        {
                                            launchGroup.launches.map((launch, i) => (
                                                <LaunchItem key={i} launch={launch} />
                                            ))
                                        }
                                    </div>
                                ))
                            }
                            {/* {   
                                this.props.launches?.map((launchGroup, i) => (
                                    i === 0 &&        <div key={i}>
                                    <div className="month-name">{launchGroup.month}</div>
                                    {
                                        launchGroup.launches.map((launch, i) => (
                                        i === 0 && <LaunchItem key={i} launch={launch} />
                                        ))
                                    }
                                </div>
                                ))
                            } */}
                        </div>
                }
            </div>
        </section>
    }
}
