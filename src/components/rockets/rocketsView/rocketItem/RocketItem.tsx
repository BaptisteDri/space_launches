import React from 'react'
import './rocketItem.css'

import { Rocket } from '../../../../types/rocket'
import UrlToCta from '../../../urlToCta/UrlToCta'

interface RocketItemProps {
    rocket: Rocket
}
interface RocketItemState { }

export default class RocketItem extends React.Component<RocketItemProps, RocketItemState> {
    render() {
        const { rocket } = this.props
        return <div className="rocket-item-container">
            <div className="rocket-item">
                <div className="image-container" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/rocket_image_placeholder.svg)` }}>
                    <img src={rocket.imageURL  && rocket.imageURL} alt="" />
                </div>
                <div className="rocket-info">
                    <h2>{rocket.name.replace(/ *\([^)]*\) */g, "")}</h2>
                    <p>Links</p>
                    <div className="links-container">
                        {
                            rocket.infoURLs && typeof rocket.infoURLs === 'object' && rocket.infoURLs.length > 0 && rocket.infoURLs.map((url: string, i: number) => <UrlToCta url={url} key={i} />)
                        }
                        {
                            ((rocket.infoURL && rocket.infoURLs.length === 0) || (rocket.infoURL && !rocket.infoURLs)) && <UrlToCta url={rocket.infoURL} />
                        }
                        {
                            rocket.wikiURL && <UrlToCta url={rocket.wikiURL} />
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}
