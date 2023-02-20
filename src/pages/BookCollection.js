import React, { Component } from 'react';
import api from '../api';


export default class BookCollection extends Component {

 
  state = {
    book: [],
  }

  async componentDidMount() {
    const response = await api.get('/book/get-all');

    this.setState({ book: response.data });
    
  }



  render() {

  const { book } = this.state;
  console.log(book);
    return (
     <div>
      <h1>Acervo</h1>
     </div>
    );
  }
}
