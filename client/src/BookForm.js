import { useMutation, gql } from '@apollo/client';
import { GET_BOOKS } from './App';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

export default function AddBookForm({ setIsModalOpen }) {
  const [addBook] = useMutation(ADD_BOOK);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;

    await addBook({
      variables: { title, author },
      refetchQueries: [{ query: GET_BOOKS }],
    });

    setIsModalOpen(false)
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="author" placeholder="Author" />
      <button type="submit">Add Book</button>
    </form>
  );
}
