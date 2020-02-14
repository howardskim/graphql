import React, { Component } from 'react'
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';

// const getBooksQuery = gql`
//     {
//         books{
//             name
//             id
//         }
//     }
// `

class BookList extends Component {
    constructor(props){
        super(props);
    }
    displayBooks = () => {
        let { data } = this.props;
        if(data.loading){
            return (
                <div>Loading...</div>
            )
        } else {
            return data.books.map((book) => {
                return (
                    <li onClick={this.handleClick} key={book.id}>{book.name}</li>
                )
            })
        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);