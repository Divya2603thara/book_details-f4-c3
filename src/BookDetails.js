import React from 'react';

const BookDetails = ({ book, onClose }) => {
  return (
    <div className="book-details">
      <button className="close-button" onClick={onClose}>Close</button>
      {/* <img
        src={book.volumeInfo.imageLinks?.thumbnail || 'no-image-available.png'}
        alt={book.volumeInfo.title}
      /> */}
      <h2>{book.volumeInfo.title}</h2>
      <p><strong>Author:</strong> {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
      <p><strong>Publish Date:</strong> {book.volumeInfo.publishedDate || 'Unknown'}</p>
      <p><strong>Avg Rating:</strong> {book.volumeInfo.averageRating || 'N/A'}</p>
      <p><strong>Rating Count:</strong> {book.volumeInfo.ratingsCount || 'N/A'}</p>
      <p><strong>Publisher:</strong> {book.volumeInfo.publisher || 'Unknown'}</p>
      <p><strong>Language:</strong> {book.volumeInfo.language || 'Unknown'}</p>
    </div>
  );
};

export default BookDetails;
