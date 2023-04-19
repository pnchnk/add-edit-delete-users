import { useState } from "react";

//redux
import { useAppSelector } from "../store/hooks";
import { useGetAllUsersQuery } from "../store/api/users";
import UserForm from "../components/UserForm";
import Table from "../components/Table";

function HomePage() {
  useGetAllUsersQuery();

  //redux state
  const users = useAppSelector((state) => state.users.users);
  const loading = useAppSelector(state => state.users.isLoading);
  const error = useAppSelector(state => state.users.error);

  if(error) {console.log(error)};

  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "white",
            zIndex:100
          }}
        >
          <p style={{ textAlign: "center", marginTop:"20%" }}>Loading...</p>
        </div>
      ) : null}
      <div className="pt-4">
        <button
          style={{ border: "none", borderRadius: "10px", padding: "10px 15px" }}
          onClick={() => setModal(true)}
        >
          Add user
        </button>
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
            <UserForm />
          </>
        ) : null}
      </div>
      <div>
        <Table users={users} />
      </div>
    </div>
  );
}

export default HomePage;
