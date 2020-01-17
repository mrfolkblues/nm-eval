import React, {Component} from 'react';
import '../css/SearchField.css';

class SearchField extends Component {
    field = null;

    getSearchTerms = (event) => {
        // limit searches to at least 2 characters
        if (this.field.value.length > 1){
            this.props.getFilteredData(this.field.value);
        }

        // search got cleared, get all items
        if (this.field.value.length === 0){
            this.props.getAllData();
        }
    };

    render() {
        return (
            <div id="SearchField">
                <input name="search_filter" id="search_filter" ref={input => this.field = input} type="text" placeholder="Type to Filter..." onChange={this.getSearchTerms} />
            </div>
        );
    }
}

export default SearchField;
