import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Busca from './Busca'
import Prateleira from './Prateleira'

/**
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
  update = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.setState((state) => ({
        books: state.books.map((b) => (this.atualizaPrateleira(b, book, shelf)))
      }))
      // Necessario atualizar a pagina para que o livro apareça na pagina principal
      window.location.reload()
    })
  }

  atualizaPrateleira = (b, book, shelf) => {
    if(b.id === book.id) b.shelf = shelf
      return b
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={
          () => (
            <Prateleira books={this.state.books}/>
          )}
        />
        <Route exact path="/search" render={
          () => (
            <Busca searchAction={this.searchBooks} searchResults={this.state.searchResults} 
            books={this.state.books} update={this.update}
            />
          )}
        />
</div>
    )
  }
}

export default BooksApp
