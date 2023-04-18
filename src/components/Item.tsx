import React, { useState } from "react";

//import { Product } from "../types";
import EditForm from "./EditForm";

//react-router
import { useNavigate } from "react-router-dom";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPencil } from "@fortawesome/free-solid-svg-icons";

//redux actions
import { useAppDispatch } from "../store/hooks";
import { useDeleteUserMutation } from "../store/api/users";
import { removeUser } from "../store/slices/users";
//import { removeFromList } from "../store/slices/users";

function Item({ name, username, email, city, phone, website, id, item }: any) {
  const [deleteUser, { isLoading, isError, isSuccess }] =
    useDeleteUserMutation();
  const [modal, setModal] = useState<boolean>(false);
  //navigation
  const navigate = useNavigate();

  //navigation func, passing item into nav props
  const handleNavigate = (item: any) => {
    navigate(`/${item.id}`, {
      state: {
        item,
      },
    });
  };

  //redux actions
  const dispatch = useAppDispatch();
  const handleDelete = async (values: any) => {
    try {
      if (values.id > 1) {
        await deleteUser(values);
        dispatch(removeUser(values));
      } else {
        dispatch(removeUser(values));
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <div className="container">
        {modal ? (
          <>
            <div
              style={{
                position: "absolute",
                height: "100vh",
                width: "100vw",
                backgroundColor: "rgba(191, 191, 191, 0.8)",
                top: 0,
                left: 0,
                zIndex: 2,
              }}
              onClick={() => setModal(false)}
            ></div>
            <EditForm id={id} />
          </>
        ) : null}
      </div>
      <tr style={{ maxWidth: "100%", cursor: "pointer" }} key={id}>
        <td style={{ fontWeight: item?.isEdited ? "bold" : "normal" }}>
          {name}
        </td>
        <td style={{ fontWeight: item?.isEdited ? "bold" : "normal" }}>
          {username}
        </td>
        <td style={{ fontWeight: item?.isEdited ? "bold" : "normal" }}>
          {email}
        </td>
        <td style={{ fontWeight: item?.isEdited ? "bold" : "normal" }}>
          {city}
        </td>
        <td style={{ fontWeight: item?.isEdited ? "bold" : "normal" }}>
          {phone}
        </td>
        <td style={{ fontWeight: item?.isEdited ? "bold" : "normal" }}>
          {website}
        </td>
        <td>
          <FontAwesomeIcon
            icon={faPencil}
            className="pencilIcon"
            style={{ display: "inline-flex" }}
            onClick={() => setModal(true)}
          />
        </td>
        <td onClick={() => handleDelete(item)}>
          <FontAwesomeIcon
            icon={faXmark}
            className="deleteIcon"
            style={{ display: "inline-flex" }}
          />
        </td>
      </tr>
    </>
  );
}

export default Item;
