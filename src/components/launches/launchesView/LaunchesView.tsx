import React from 'react'
import './launchesView.css'

import { Launch } from '../../../types/launch'
import LaunchItem from './launchItem/LaunchItem'
import Header from '../../header/Header'
import SearchInput from '../../searchInput/SearchInput'

interface LaunchesViewProps {
    isLoaded: boolean
    launches?: Launch[]
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
