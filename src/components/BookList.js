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
        this.state = {
            id: ''
        }
    }
    handleClick = (id) => {
        this.setState({
            id
        })
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
                    <li onClick={() => this.handleClick(book.id)} key={book.id}>{book.name}</li>
                )
            })
        }
    }
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails id={this.state.id} />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList);