import React, {Component} from 'react';
import ResultsListItem from './ResultsListItem';
import '../css/ResultsList.css';

class ResultsList extends Component {
    render() {
        if (this.props.albums.length === 0){
            return (
                <div id="ResultsList" className="no-matches">
                    <h2>No matching albums!</h2>
                    <h3>Try a different search.</h3>
                </div>
            );
        }else{
            return (
                <div id="ResultsList">
                    {this.props.albums.map((album, index) => {
                        return (
                            <ResultsListItem key={index} album={album} />
                        );
                    })}
                </div>
            );
        }
    }
}

export default ResultsList;
