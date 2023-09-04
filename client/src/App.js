import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import AddBookForm from "./BookForm";

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
    }
  }
`;

export default function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data.books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>

      {!isModalOpen && (
        <button onClick={() => setIsModalOpen(true)}>Add Book</button>
      )}

      {isModalOpen && <AddBookForm setIsModalOpen={setIsModalOpen} />}
    </div>
  );
}
