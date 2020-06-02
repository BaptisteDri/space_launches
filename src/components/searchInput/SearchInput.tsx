import React from 'react'
import './searchInput.css'

interface searchInputProps {
    onSearchFiltering: (filter: string) => void
}
interface searchInputState {
    filterValue: string
}

export default class searchInput extends React.Component<searchInputProps, searchInputState> {
    constructor(props: searchInputProps) {
        super(props)

        this.state = {
            filterValue: ''
        }
    }

    render() {
        return <div className="search-container">
            <div className="search-input-container">
                <input
                    className="search-input"
                    id="search"
                    type="text"
                    placeholder="Rechercher"
                    onChange={e => {
                        this.props.onSearchFiltering(e.target.value)
                        this.setState({ filterValue: e.target.value })
                    }}
                    value={this.state.filterValue}
                />
                {
                    this.state.filterValue !== ''
                        ? <span onClick={() => this.setState({ filterValue: '' }, () => this.props.onSearchFiltering(''))}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                        </span>
                        : <label htmlFor="search">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                        </label>
                }
            </div>
            <div className="filters-container">
                <button onClick={() => this.setState({ filterValue: 'SpaceX' }, () => this.props.onSearchFiltering('spacex'))}>
                    <svg version="1.1" x="0px" y="0px" viewBox="0 0 400 50">
                        <title>SpaceX Logo</title>
                        <g>
                            <path fill="#FFF" d="M37.5,30.5H10.9v-6.6h34.3c-0.9-2.8-3.8-5.4-8.9-5.4H11.4c-5.7,0-9,2.1-9,6.7v4.9c0,4,3.4,6.3,8.4,6.3h26.9v7H1.5
                                c0.9,3.8,3.8,5.8,9,5.8h27.1c5.7,0,8.5-2.2,8.5-6.9v-4.9C46.1,33.1,42.8,30.8,37.5,30.5z"></path>
                        </g>
                        <g>
                            <path fill="#FFF" d="M91.8,18.6H59v30.7h9.3V37.5h24.2c6.7,0,10.4-2.3,10.4-7.7v-3.4C102.8,21.4,98.6,18.6,91.8,18.6z M94.8,28.4
                                c0,2.2-0.4,3.4-4,3.4H68.3l0.1-8h22c4,0,4.5,1.2,4.5,3.3V28.4z"></path>
                        </g>
                        <g>
                            <polygon fill="#FFF" points="129.9,17.3 124.3,24.2 133.8,37.3 114,37.3 109.1,42.5 137.7,42.5 142.6,49.3 153.6,49.3 	"></polygon>
                        </g>
                        <g>
                            <path fill="#FFF" d="M171.4,23.9h34.8c-0.9-3.6-4.4-5.4-9.4-5.4h-26c-4.5,0-8.8,1.8-8.8,6.7v17.2c0,4.9,4.3,6.7,8.8,6.7h26.3
                                c6,0,8.1-1.7,9.1-5.8h-34.8V23.9z"></path>
                        </g>
                        <g>
                            <polygon fill="#FFF" points="228.3,43.5 228.3,34.1 247,34.1 247,28.9 218.9,28.9 218.9,49.3 260.4,49.3 260.4,43.5 	"></polygon>
                            <rect fill="#FFF" x="219.9" y="18.6" width="41.9" height="5.4"></rect>
                        </g>
                        <g>
                            <path fill="#FFF" d="M287.6,18.6H273l17.2,12.6c2.5-1.7,5.4-3.5,8-5L287.6,18.6z"></path>
                            <path fill="#FFF" d="M308.8,34.3c-2.5,1.7-5,3.6-7.4,5.4l13,9.5h14.7L308.8,34.3z"></path>
                        </g>
                        <g>
                            <path fill="#FFF" d="M399,0.7c-80,4.6-117,38.8-125.3,46.9l-1.7,1.6h14.8C326.8,9.1,384.3,2,399,0.7L399,0.7z"></path>
                        </g>
                    </svg>
                </button>
                <button onClick={() => this.setState({ filterValue: 'Ariane' }, () => this.props.onSearchFiltering('ariane'))}>
                    <img src={process.env.PUBLIC_URL + '/ariane_group.png'} alt="Ariane Group logo png" />
                </button>
                <button onClick={() => this.setState({ filterValue: 'Soyuz' }, () => this.props.onSearchFiltering('soyuz'))}>
                    <img src={process.env.PUBLIC_URL + '/soyuz.png'} alt="Soyuz logo png" className="soyuz" />
                </button>
            </div>
        </div>
    }
}