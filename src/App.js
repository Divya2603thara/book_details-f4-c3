import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookDetails from './BookDetails'; // Import the BookDetails component
import Navbar from './Navbar'; // Import the Navbar component
import './App.css'; // Import the CSS file

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);

  useEffect(() => {
    fetchBooksData();
  }, []);

  const fetchBooksData = async (searchQuery = "ramayan") => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`
      );

      const booksData = response.data.items;
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleBookClick = (book, index) => {
    setSelectedBook(book);
    setSelectedBookIndex(index);
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
    setSelectedBookIndex(null);
  };

  // const handleMoveSelectedBook = () => {
  //   if (selectedBookIndex > 2) {
  //     const bookToMove = books[selectedBookIndex];
  //     const updatedBooks = [
  //       ...books.slice(0, 3),
  //       bookToMove,
  //       ...books.slice(3, selectedBookIndex),
  //       ...books.slice(selectedBookIndex + 1),
  //     ];
  //     setBooks(updatedBooks);
  //   }
  // };

  return (
    <div>
      <Navbar onSearch={fetchBooksData} />

      <h1>Books</h1>
      <div className="book-container">
        {!selectedBook
          ? books.slice(0, 3).map((book, index) => (
              <div key={book.id} className="book-card">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || 'no-image-available.png'}
                  alt={book.volumeInfo.title}
                />
                <h2>{book.volumeInfo.title}</h2>
                <button onClick={() => handleBookClick(book, index)}>Read Now</button>
              </div>
            ))
          : books.slice(0, 3).map((book, index) =>
              index === selectedBookIndex ? (
                <div key={book.id} className="book-card">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'no-image-available.png'}
                    alt={book.volumeInfo.title}
                  />
                  {/* <h2>{book.volumeInfo.title}</h2> */}
                  {selectedBook && (
        <BookDetails book={selectedBook} onClose={handleCloseDetails} />
      )}
                  {/* <button onClick={handleCloseDetails}>Close Details</button> */}
                </div>
              ) : (
                <div key={book.id} className="hidden">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'no-image-available.png'}
                    alt={book.volumeInfo.title}
                  />
                  <h2>{book.volumeInfo.title}</h2>
                  <button onClick={() => handleBookClick(book, index)}>Read Now</button>
                </div>
              )
            )}
      </div>

      <h2>More Books</h2>
      <div className="more-books-container">
        {books.slice(3).map((book, index) => (
          <div key={book.id} className={`more-book-card ${index >= 18 ? 'hidden' : ''}`}>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || 'no-image-available.png'}
              alt={book.volumeInfo.title}
            />
            
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default App;
