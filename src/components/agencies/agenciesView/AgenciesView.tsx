import React from 'react'
import './agenciesView.css'

import Header from '../../header/Header'
import { OrderedAgencies } from '../../../types/agency'
import AgencyItem from './agencyItem/AgencyItem'

interface LaunchesViewProps {
    isLoaded: boolean
    agencies?: OrderedAgencies[]
}
interface LaunchesViewState { }

export default class LaunchesView extends React.Component<LaunchesViewProps, LaunchesViewState> {
    render() {
        return <section id="agencies">
            <Header h1="Agences spatiales" />
            <div className="agencies-list">
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
                                this.props.agencies?.map((agencyGroup, i) => (
                                    <div key={i}>
                                        <div className="country-name">{agencyGroup.country}</div>
                                        {
                                            agencyGroup.agencies.map((agency, i) => (
                                                <AgencyItem key={i} agency={agency} />
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </section>
    }
}
