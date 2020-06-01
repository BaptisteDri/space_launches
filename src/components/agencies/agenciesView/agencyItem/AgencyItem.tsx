import React from 'react'
import './agencyItem.css'

import { Agency } from '../../../../types/agency'
import UrlToCta from '../../../urlToCta/UrlToCta'

interface AgencyItemProps {
    agency: Agency
}
interface AgencyItemState { }

export default class AgencyItem extends React.Component<AgencyItemProps, AgencyItemState> {
    render() {
        const { agency } = this.props
        return <div className="agency-item-container">
            <div className="agency-item">
                <div
                    className="image-container"
                // style={
                //     (agency.rocket.imageURL !== 'https://agencylibrary1.nyc3.digitaloceanspaces.com/RocketImages/placeholder_1920.png' && typeof agency.rocket.imageURL === 'string' && agency.rocket.imageURL.includes('://'))
                //     ? { backgroundImage: `url(${agency.rocket.imageURL})` }
                //     : { backgroundImage: `url(${process.env.PUBLIC_URL}/rocket_image_placeholder.svg)` }
                // }
                >
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
                    {/* 
                        wikipedia
                        twitter
                        youtube
                    */}
                </div>
            </div>
        </div>
    }
}
