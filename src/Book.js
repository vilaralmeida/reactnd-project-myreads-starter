import React, {Component} from 'react'

class Book extends Component {


  updateShelf = (shelf) => {
    this.props.updateShelf(this.props.book, shelf)
  }


  render(){

    // Variavel que armazena qual a correta prateleira onde o livro deve estar
    let bookshelf = 'none';
    if(this.props.book.shelf) {
      bookshelf = this.props.book.shelf
    }

    let thumbnail = this.props.book.imageLinks.thumbnail

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={bookshelf} onChange={(event) => this.updateShelf(event.target.value)} >
                <option value="noValue" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          {this.props.book.authors.map((author, index) => (
            <div key={index} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book
