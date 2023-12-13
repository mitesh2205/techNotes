import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./noteApiSlice";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.created).toLocaleString();
    const updated = new Date(note.updated).toLocaleString();
    const handleEdit = () => navigate(`/dash/notes/${noteId}`);
    
    return (
      <tr>
        <td className='px-4 py-2'> {"Not"} </td>
        <td className='px-4 py-2'> {"fba"} </td>
        <td className='px-4 py-2'> {"abfh"} </td>
        <td className='px-4 py-2'> {"created"} </td>
        <td className='px-4 py-2'> {"updated"} </td>
        <td className='px-4 py-2'>
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

export default Note;
