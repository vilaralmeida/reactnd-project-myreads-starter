import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'

/**
 * @author Rodrigo Almeida
 * @desc Classe Aplicativo do Livro
 */
class BooksApp extends React.Component {
  
  /**
   * Elementos principais da aplicação Myreads. 
   * Salvando informacoes de Livros e resultados da Busca realiada pelo usuario
   */
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    this.getBooks()
  }

  // Retornando todos os livros disponiveis atraves da API de chamada
  getBooks = () => {
    BooksAPI.getAll().then((returnedBooks) => {
      this.setState({books:returnedBooks})
    })
  }

  // Realizando busca dos livros atraves da API
  searchBooks = query => {
    BooksAPI.search(query).then((returnedBooks) => {
      this.setState({searchResults:returnedBooks})
    })
  }



  // Atualizando cada livro para sua devida prateleira
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState((state) => ({
        books: state.books.map((b) => (this.updateBookShelfState(b, book, shelf)))
      }))
      // Necessario atualizar a pagina para que o livro apareça na pagina principal
      window.location.reload()
    })
  }

  updateBookShelfState = (b, book, shelf) => {
    if(b.id === book.id) b.shelf = shelf
      return b
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={
          () => (
            <BookShelf
              books={this.state.books}
            />
          )}
        />
        <Route exact path="/search" render={
          () => (
            <SearchBooks
              searchAction={this.searchBooks}
              searchResults={this.state.searchResults}
              books={this.state.books}
              updateShelf={this.updateShelf}
            />
          )}
        />
</div>
    )
  }
}

export default BooksApp
