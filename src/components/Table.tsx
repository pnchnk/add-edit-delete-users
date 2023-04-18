import React, { useEffect, useState } from "react";

//types
// import { ProductsSlice } from "../store/type";
// import { Product } from "../types";

//components
import Item from "../components/Item";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCaretUp,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

function Table({ users }: any) {
  useEffect(() => {
    //set filteredData to render initial state
    setFilteredData(users);
  }, [users]);

  //states for searching
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(users);

  //searching function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredItems = users?.filter(
      (item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.username?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredItems);
  };

  return (
    <>
      <div className="search">
        <FontAwesomeIcon
          icon={faSearch}
          style={{ display: "flex", alignSelf: "center" }}
        />
        <input
          placeholder="Search in table..."
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          style={{ outline: "none", border: "none", padding: "4px 6px" }}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} scope="col">
              Name
            </th>
            <th>Username</th>
            <th style={{ cursor: "pointer" }} scope="col">
              Email
            </th>
            <th style={{ cursor: "pointer" }} scope="col">
              City
            </th>
            <th style={{ cursor: "pointer" }} scope="col">
              Phone
            </th>
            <th style={{ cursor: "pointer" }} scope="col">
              Website
            </th>
            <th style={{ cursor: "pointer" }} scope="col">
              Edit
            </th>
            <th style={{ cursor: "pointer" }} scope="col">
              Delete
            </th>
          </tr>
        </thead>
        <tbody style={{ maxWidth: "100%" }}>
          {filteredData?.map((item: any) => {
            return (
              <Item
                id={item.id}
                name={item.name}
                username={item.username}
                phone={item.phone}
                city={item.address.city}
                email={item.email}
                website={item.website}
                key={item.id}
                item={item}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
