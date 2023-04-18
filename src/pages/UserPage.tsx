import { useAppSelector } from "../store/hooks";

//route
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";

//store
import { useGetUserQuery } from "../store/api/users";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

function UserPage() {
  //get params
  const params = useParams();
  const id = params.id;
  //rtk query
  const { data } = useGetUserQuery(params?.id!);

  const users = useAppSelector((state) => state.users.users);
  const userIndex = users.findIndex((user: any) => user.id === parseInt(id!));
  const user = users[userIndex + 1];

  //getting item from location
  const location = useLocation();
  let item = location.state?.item;
  const navigate = useNavigate();

  const handlePreviousUser = () => {
    if (userIndex > 0) {
      const previousUser = users[userIndex - 1];
      navigate(`/${previousUser.id}`);
    }
  };

  const handleNextUser = () => {
    if (userIndex < users.length - 1) {
      const nextUser = users[userIndex + 1];
      navigate(`/${nextUser.id}`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row px-5 py-5">
          <Link className="navbar-brand product-nav-link" to={"/"}>
            <FontAwesomeIcon icon={faBackward} />
            Main Page
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
          {data?.id > 0 ? (
            <>
              <div className="small mb-1">ID: {data?.id}</div>
              <h1 className="display-5 fw-bolder">{data?.name}</h1>
              <div className="fs-5 mb-5">
                <p>Username: {data?.username}</p>
                <p>Email: {data?.email}</p>
                <p>Phone: {data?.phone}</p>
                <p>Website: {data?.website}</p>
              </div>
            </>
          ) : (
            <>
              <div className="small mb-1">ID: {item?.id}</div>
              <h1 className="display-5 fw-bolder">{item?.name}</h1>
              <div className="fs-5 mb-5">
                <p>Username: {item?.username}</p>
                <p>Email: {item?.email}</p>
                <p>Phone: {item?.phone}</p>
                <p>Website: {item?.website}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserPage;
