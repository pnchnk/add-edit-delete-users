import { useAppSelector } from "../store/hooks";

//route
import { useParams, Link, useNavigate } from "react-router-dom";

//store
import { useGetUserQuery } from "../store/api/users";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function UserPage() {
  //current user for static render
  const [currentUser, setCurrentUser] = useState();

  //get params
  const params = useParams();
  const id = params.id;

  //rtk query for get user from server but we cannot get our custom user
  const { data } = useGetUserQuery(params?.id!);

  //redux state
  const users = useAppSelector((state) => state.users.users);

  //for prev next navigation
  const userIndex = users.findIndex((user: any) => user.id === parseInt(id!));

  //getting item from location
  const navigate = useNavigate();

  const findUser = () => {
    //@ts-ignore
    setCurrentUser(users?.find((i: any) => i.id === Number(id)));
  };

  useEffect(() => {
    findUser();
  }, [id]);


  const handlePreviousUser = () => {
    if (userIndex > 0) {
      const previousUser = users[userIndex - 1];
      navigate(`/users/${previousUser.id}`);
    }
  };

  const handleNextUser = () => {
    if (userIndex < users.length - 1) {
      const nextUser = users[userIndex + 1];
      navigate(`/users/${nextUser.id}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row px-5 py-5">
          <Link className="navbar-brand product-nav-link" to={"/users/"}>
            <FontAwesomeIcon icon={faBackward} />
            Users Page
          </Link>
          <div style={{ display: "flex", gap: "30px" }} className="mt-4">
            <button
              style={{ width: "150px", border: "none", borderRadius: "10px" }}
              onClick={handlePreviousUser}
              disabled={userIndex < 1}
            >
              Prev user
            </button>
            <button
              style={{ width: "150px", border: "none", borderRadius: "10px" }}
              onClick={handleNextUser}
              disabled={userIndex === users.length - 1}
            >
              Next user
            </button>
          </div>
        </div>
        <div
          className="col-md-6 ps-4"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px 15px",
          }}
        >
          <>
            <div className="small mb-1">
              ID:{" "}
              {
                //@ts-ignore
                currentUser?.id
              }
            </div>
            <h1 className="display-5 fw-bolder">
              {
                //@ts-ignore
                currentUser?.name
              }
            </h1>
            <div className="fs-5 mb-5">
              <p>
                Username:{" "}
                {
                  //@ts-ignore
                  currentUser?.username
                }
              </p>
              <p>
                Email:{" "}
                {
                  //@ts-ignore
                  currentUser?.email
                }
              </p>
              <p>
                Phone:{" "}
                {
                  //@ts-ignore
                  currentUser?.phone
                }
              </p>
              <p>
                Website:{" "}
                {
                  //@ts-ignore
                  currentUser?.website
                }
              </p>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default UserPage;
