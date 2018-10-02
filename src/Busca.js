import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

/**
 * 
 * Classe de busca
 */
class Busca extends Component {

  state = {
    query:''
  }

  // Metodo de atualizacao dos dados dos livros
  updateQuery = (query) => {
    this.setState({query: query})
    // Se a consulta nao estiver vazia , a consulta deve ser realizada
    if(query !== '') { 
      this.props.searchAction(query) 
      console.log("Realizando consulta com a query: " + query)
    } else {
      console.log("Query de consulta vazia.")
    }
  }


  // Atualizacao da Prateleira (metodo de referencia)
  atualizarPrateleira = (res) => {
    let s = this.props.books.filter((bo) => (bo.id === res.id))
    if(s[0] != null) {
      res.shelf = s[0].shelf
      console.log("Foram encontrados livros para atualizacao")
    } else {
      res.shelf = 'none'
      console.log("Nao foram encontrados livros para atualizacao")
    }
    return res
  }


  render(){


    let buscaLivro
    if(Array.isArray(this.props.searchResults) ) {
      buscaLivro = this.props.searchResults.map((param) => (this.atualizarPrateleira(param)))
      console.log("Foram encontrados livros")
    } else {
      buscaLivro = []
      console.log("Nao foram encontrados livros")
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
            {
              buscaLivro && 
              buscaLivro.map((book) => (
                <Book key={book.id}  book={book} update={this.props.update}></Book>
            ))
            }
          </ol>
        </div>
      </div>
    )
  }

}

export default Busca