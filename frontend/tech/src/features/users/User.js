import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./userApiSlice";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    // Check if user.roles is defined before calling toString
    const userRolesString =
      user.roles && user.roles.length > 0
        ? user.roles.toString().replaceAll(",", ", ")
        : "No roles";

    const cellStatus = user.active ? "" : "table-cell bg-red-200";

    return (
      <tr>
        <td className={`px-4 py-2 ${cellStatus}`}> {user.username} </td>
        <td className={`px-4 py-2 ${cellStatus}`}> {userRolesString} </td>
        <td className={`px-4 py-2 ${cellStatus}`}>
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

export default User;
