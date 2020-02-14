import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

class BookDetails extends Component {
    render() {
        return (
            <div id="book-details">
                <p>Outbook Details Here</p>
            </div>
        )
    }
}

export default graphql(getBookQuery)(BookDetails);