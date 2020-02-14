import React, { Component } from 'react'
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

// const getAuthorsQuery = gql`
//     {
//         authors{
//             name
//             id
//         }
//     }
// `

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }
    displayAuthors = () => {
        let { getAuthorsQuery } = this.props;
        if(getAuthorsQuery.loading){
            return (
                <option disabled>Loading...</option>
            )
        } else {
            return (
                getAuthorsQuery.authors.map((author) => {
                    return (
                        <option key={author.id} value={author.id}>{author.name}</option>
                    )
                })
            )
        }
    }
    handleChange = (e) =>{
        let typed = e.target.value;
        this.setState({
            [e.target.name]: typed
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { name, genre, authorId } = this.state;
        this.props.addBookMutation({
            variables:{
                name,
                genre,
                authorId
            },
            refetchQueries:[{
                query: getBooksQuery
            }]
        })

    }
    handleSelectChange = (e) => {
        this.setState({
            authorId: e.target.value
        })
    }
    render() {
        return (
            <form id="add-book" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label htmlFor="">Book Name:</label>
                    <input type="text" onChange={this.handleChange} value={this.state.name} name="name"/>
                </div>
                <div className="field">
                    <label htmlFor="">Genre:</label>
                    <input type="text" onChange={this.handleChange} value={this.state.genre} name="genre"/>
                </div>
                <div className="field">
                    <label htmlFor="">Author: </label>
                    <select onChange={this.handleSelectChange}>
                        <option value="">Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}
export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);