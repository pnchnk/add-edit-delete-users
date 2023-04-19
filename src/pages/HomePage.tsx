import { useState } from "react";

//redux
import { useAppSelector } from "../store/hooks";
import { useGetAllUsersQuery } from "../store/api/users";
import UserForm from "../components/UserForm";
import Table from "../components/Table";

function HomePage() {
  useGetAllUsersQuery();

  //redux state
  const users = useAppSelector(state => state.users.users);

  const [modal, setModal] = useState<boolean>(false);
  
  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div className="pt-4">
        <button style={{border:"none", borderRadius:"10px", padding:"10px 15px"}} onClick={() => setModal(true)}>
          Add user
        </button>
        {modal ? (
        <>
        <div style={{position:"absolute", height:"100vh", width:"100vw", backgroundColor:"rgba(191, 191, 191, 0.8)", top:0, left:0, zIndex:2}} onClick={() => setModal(false)}></div>
          <UserForm />
        </>
      ) : null}
      </div>
      <div>
        <Table users={users}/>
      </div>
    </div>
  );
}

export default HomePage;
