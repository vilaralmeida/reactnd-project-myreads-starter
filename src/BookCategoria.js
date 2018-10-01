import React, {Component} from 'react'
import Book from './Book'


/**
 * 
 * Classe que representa os livros de uma mesma categoria
 */
class BookCategoria extends Component {

  render(){
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {this.props.books.map((book) => (<Book key={book.id} book={book} updateShelf={this.props.updateShelf} />))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookCategoria