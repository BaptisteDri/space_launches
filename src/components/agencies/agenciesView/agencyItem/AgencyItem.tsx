import React from 'react'
import './agencyItem.css'

import { Agency } from '../../../../types/agency'
import UrlToCta from '../../../urlToCta/UrlToCta'

import { findFlagUrlByIso3Code } from "country-flags-svg"

interface AgencyItemProps {
    agency: Agency
}
interface AgencyItemState { }

export default class AgencyItem extends React.Component<AgencyItemProps, AgencyItemState> {
    render() {
        const { agency } = this.props
        return <div className="agency-item-container">
            <div className="agency-item">
                <div className="image-container">
                    {
                        findFlagUrlByIso3Code(agency.countryCode)
                        ? <img src={findFlagUrlByIso3Code(agency.countryCode) ? findFlagUrlByIso3Code(agency.countryCode) : '' } alt={agency.countryCode}/>
                        : <svg id="Layer_1" version="1.1" viewBox="0 0 50 50" ><g fill="#2cb67d" id="Layer_1_1_"><rect height="2" width="2" x="21" y="18"/><rect height="2" width="2" x="25" y="18"/><rect height="2" width="2" x="29" y="18"/><rect height="2" width="2" x="33" y="18"/><rect height="2" width="2" x="21" y="22"/><rect height="2" width="2" x="25" y="22"/><rect height="2" width="2" x="29" y="22"/><rect height="2" width="2" x="33" y="22"/><rect height="2" width="2" x="21" y="26"/><rect height="2" width="2" x="25" y="26"/><rect height="2" width="2" x="29" y="26"/><rect height="2" width="2" x="33" y="26"/><rect height="2" width="2" x="21" y="30"/><rect height="2" width="2" x="25" y="30"/><rect height="2" width="2" x="29" y="30"/><rect height="2" width="2" x="33" y="30"/><rect height="2" width="2" x="5" y="24"/><rect height="2" width="2" x="9" y="24"/><rect height="2" width="2" x="13" y="24"/><rect height="2" width="2" x="5" y="28"/><rect height="2" width="2" x="9" y="28"/><rect height="2" width="2" x="13" y="28"/><rect height="2" width="2" x="5" y="32"/><rect height="2" width="2" x="9" y="32"/><rect height="2" width="2" x="13" y="32"/><rect height="2" width="2" x="5" y="36"/><rect height="2" width="2" x="9" y="36"/><rect height="2" width="2" x="13" y="36"/><rect height="2" width="4" x="41" y="22"/><rect height="2" width="4" x="41" y="18"/><rect height="2" width="4" x="41" y="26"/><rect height="2" width="4" x="41" y="30"/><rect height="2" width="4" x="41" y="34"/><rect height="2" width="4" x="41" y="38"/><rect height="2" width="4" x="41" y="42"/><path d="M46,9h-2v3.979l-7-4.9V14h-3V7h-5V1h-2v6h-5v7h-5v6H5v-1.586l1.243-1.243C7.054,17.709,8.004,18,9,18   c1.336,0,2.591-0.52,3.535-1.464l0.707-0.707l-7.07-7.071L5.465,9.465c-1.707,1.707-1.919,4.352-0.636,6.292L3,17.586V20H1v29h16h2   h5h8h5h2h10V16.479l-3-2.1V9z M6.293,11.707l4.001,4.001c-1.101,0.527-2.527,0.301-3.415-0.587   C5.957,14.2,5.762,12.822,6.293,11.707z M24,9h8v5h-8V9z M17,47H3V22h14V47z M26,47v-7h4v7H26z M37,47h-5v-9h-8v9h-5V20v-4h3h12h3   V47z M47,47h-8V14v-2.08l8,5.6V47z"/></g></svg>
                    }
                </div>
                <div className="agency-info">
                    <h2>{agency.name.replace(/ *\([^)]*\) */g, "")}</h2>
                    <p>Links</p>
                    <div className="links-container">
                        {
                            agency.infoURLs && typeof agency.infoURLs === 'object' && agency.infoURLs.length > 0 && agency.infoURLs.map((url: string, i: number) => <UrlToCta url={url} key={i} />)
                        }
                        {
                            ((agency.infoURL && agency.infoURLs.length === 0) || (agency.infoURL && !agency.infoURLs)) && <UrlToCta url={agency.infoURL} />
                        }
                        {
                            agency.wikiURL && <UrlToCta url={agency.wikiURL} />
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}
