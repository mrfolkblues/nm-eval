import React, {Component} from 'react';
import Axios from 'axios';
import SearchField from './components/SearchField';
import ResultsList from './components/ResultsList';
import './css/App.css';
import logo from './logo.svg';

Axios.defaults.baseURL = 'http://localhost:9000';

class App extends Component {
    state = {
        albums: [],
        dataReady: false
    };

    componentDidMount(){
        // do initial request from Spotify API which will save data locally (on the server)
        // ideally this would run as a cron job though
        Axios.get('/get-api-data')
        .then((response) => {
            console.log('Data loaded from the Spotify API.');
            // don't really need this response, but now the cached data is ready
            this.setState({
                dataReady: true
            });

            this.getAllData();
        })
        .catch(function(error){
            console.warn(error);
        });
    }

    componentDidUpdate(){
        //
    }

    getAllData = () => {
        // retrieve cached data
        Axios.get('/get-data')
        .then((response) => {
            this.setState({
                albums: response.data.albums.items || []
            });
        })
        .catch(function(error){
            console.warn(error);
        });
    };

    getFilteredData = (search_terms) => {
        // retrieve data based on a search string
        Axios.get('/get-data?s=' + search_terms)
        .then((response) => {
            this.setState({
                albums: response.data.albums.items || []
            });
        })
        .catch(function(error){
            console.warn(error);
        });
    };

    render(){
        return (
            <div className="App">
                <header>
                    <nav>
                        <img src={logo} alt="Spotify" />
                        <h1>New Releases</h1>
                        <SearchField getFilteredData={this.getFilteredData} getAllData={this.getAllData} />
                    </nav>
                </header>

                <ResultsList albums={this.state.albums} />

                <footer>
                    <p>Developed by <a href="http://mattengel.com" target="_blank" rel="noopener noreferrer">Matt Engel</a> for NM Evaluation</p>
                </footer>
            </div>
        );
    }
}

export default App;
