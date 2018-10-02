import React, {Component} from 'react'


/**
 * Classe que representa o livro
 * 
 */
class Book extends Component {


  update = (prat) => {
    this.props.update(this.props.book, prat)
  }


  render(){

    // Variavel que armazena qual a correta prateleira onde o livro deve estar
    let prateleira = 'none';
    if(this.props.book.shelf) {
      prateleira = this.props.book.shelf
    }


    let imagem = this.props.book.imageLinks &&
    this.props.book.imageLinks.thumbnail

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imagem})` }}></div>
            <div className="book-shelf-changer">
              <select value={prateleira} onChange={(event) => this.update(event.target.value)} >
                <option value="noValue" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          { 
            this.props.book.authors &&
            this.props.book.authors.map((author, index) => (
            <div key={index} className="book-authors">{author}</div>
          ))}
        </div>
      </li>
    )
  }
}

export default Book
