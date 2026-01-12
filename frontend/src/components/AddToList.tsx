import { addBookToList} from "../api/AddBookToListApi";
import type { ListType} from "../api/AddBookToListApi";
type Props = {
  googleId: string;
  title: string;
  authors: string[];
  pageCount: number;
};

const AddToList = ({ googleId, title, authors,pageCount }: Props) => {
  const handleAdd = async (listType: ListType) => {
    try {
      await addBookToList(listType, {
        googleId,
        title,
        authors,
        pageCount,
      });
      alert("Book added ✅");
      console.log(listType,googleId,title,authors,pageCount)
    } catch (err) {
      console.log(listType,googleId,title,authors)
      alert("There was an error ❌");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <p>Hozzáadás listához:</p>

      <button onClick={() => handleAdd("TO_READ")}>
        📚 To read
      </button>

      <button onClick={() => handleAdd("READING_NOW")}>
        📖 Reading now
      </button>

      <button onClick={() => handleAdd("READ")}>
        ✅ Read
      </button>
    </div>
  );
};

export default AddToList;
