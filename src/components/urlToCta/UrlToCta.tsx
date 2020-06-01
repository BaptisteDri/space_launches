import React from 'react'
import './urlToCta.css'

interface urlToCtaProps {
    url: string
}
interface urlToCtaState {
    urlType: string
}


export default class urlToCta extends React.Component<urlToCtaProps, urlToCtaState> {
    constructor(props: urlToCtaProps) {
        super(props)

        this.state = {
            urlType: this.setUrlType(this.props.url)
        }

        this.setUrlType = this.setUrlType.bind(this)
    }

    setUrlType(url: string) {
        if (url.includes('youtube')) {
            return 'youtube'
        } else if (url.includes('twitter')) {
            return 'twitter'
        } else if (url.includes('wikipedia')) {
            return 'wikipedia'
        } else if (url.includes('facebook')) {
            return 'facebook'
        } else if (url.includes('instagram')) {
            return 'instagram'
        } else if (url.includes('linkedin')) {
            return 'linkedin'
        } else if (url.includes('flickr')) {
            return 'flickr'
        } else {
            return url.split('.')[1]
        }
    }

    render() {
        return <a
            href={this.props.url}
            target="_blank"
            rel="noopener noreferrer"
            className={'ext-cta ' + this.state.urlType}
        >
            {
                this.state.urlType !== 'custom'
                    ? this.state.urlType
                    : 'Agence'
            }
        </a>
    }
}

