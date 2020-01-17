import React, {Component} from 'react';
import '../css/ResultsListItem.css';

class ResultsListItem extends Component {
    joinArtistNames = () => {
        let names = [];
        this.props.album.artists.forEach((artist, index) => {
            names.push(artist.name);
        });

        return names.join(', ');
    };

    render() {
        // set up responsive image sizes
        let srces = [];
        let sizes = [];
        // sort them so they come out smallest to largest
        // then put the src and size strings into the arrays
        this.props.album.images.sort((a, b) => a.width - b.width).forEach((image) => {
            srces.push(`${image.url} ${image.width}w`);

            if (image.width <= 64){
                sizes.push(`(max-width:599px) ${image.width}px`);
            }else if (image.width <= 300){
                sizes.push(`(max-width:899px) ${image.width}px`);
            }else{
                sizes.push(`${image.width}px`);
            }
        });

        return (
            <div className="ResultsListItem">
                <div className="album-info">
                    <div className="album-image">
                        <img srcSet={srces.join()} sizes={sizes.join()} src={this.props.album.images[2].url} alt={this.props.album.name} />
                    </div>

                    <h2 className="album-title">{this.props.album.name}</h2>
                    <h3 className="artists">{this.joinArtistNames()}</h3>

                    <a href={this.props.album.external_urls.spotify} className="album-link" target="_blank" rel="noopener noreferrer"><span>Listen on Spotify</span></a>
                </div>
            </div>
        );
    }
}

export default ResultsListItem;
