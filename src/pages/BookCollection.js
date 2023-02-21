import React, {useEffect, useState } from 'react';
import axios from 'axios';

import NavbarComponent from '../components/NavbarComponent';

export default function BookCollection() {

  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get("https://sisgb-api.vercel.app/book/get-all");

      const data = response.data;

      console.log(data);
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBooks()
  }, []);

  return (
    <>

      <NavbarComponent about={true} signUp={true} />

    </>
  );
}
