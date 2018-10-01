import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

/**
 * 
 * Classe de busca
 */
class SearchBooks extends Component {

  state = {
    query:''
  }

  // Metodo de atualizacao dos dados dos livros
  updateQuery = (query) => {
    this.setState({query: query})
    if(query !== '') { 
      this.props.searchAction(query) 
    }
  }


  // Atualizacao da Prateleira
  atualizarPrateleira = (res) => {
    let s = this.props.books.filter((bo) => (bo.id === res.id))
    if(s[0] != null) {
      res.shelf = s[0].shelf
    }
    else {
      res.shelf = 'none'
    }
    return res
  }

  render(){


    let buscaLivro
    if(Array.isArray(this.props.searchResults) ) {
      buscaLivro = this.props.searchResults.map((se) => (this.atualizarPrateleira(se)))
    } else {
      buscaLivro = []
    }


    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type='text'
              placeholder='Search by title or author'
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {buscaLivro.map((book) => (
              <Book key={book.id}  book={book} updateShelf={this.props.updateShelf} />
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default SearchBooks