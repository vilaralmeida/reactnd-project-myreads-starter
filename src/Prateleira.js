import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BookCategoria from './BookCategoria'

/**
 * 
 * Classe responsavel por representar a prateleira de livros
 * 
 */
class Prateleira extends Component {

  render(){

    /** Variaveis que irao compor a navegacao das paginas */
    let currentlyReading
    let wantToRead
    let read

    currentlyReading = this.props.books.filter(book => book.shelf === 'currentlyReading')
    wantToRead = this.props.books.filter(book => book.shelf === 'wantToRead')
    read = this.props.books.filter(book => book.shelf === 'read')


    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookCategoria title="Currently Reading" books={currentlyReading} update={this.props.update} />
            <BookCategoria title="Want to Read" books={wantToRead} update={this.props.update} />
            <BookCategoria title="Read" books={read} update={this.props.update} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

    )
  }

}

export default Prateleira
