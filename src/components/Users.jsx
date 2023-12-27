import axios from "axios";
import { useState, useEffect } from "react";

const baseUrl = "http://localhost:3001/api";

function Users() {
  const [usersArr, setUsersArr] = useState([]);
  const [nameVal, setNameVal] = useState("");
  const [townVal, setTownVal] = useState("");
  const [isDriver, setIsDriver] = useState(false);

  //atsisiusti userius ir iskonsolinti
  useEffect(() => {
    axios
      .get(`${baseUrl}/users`)
      .then((ats) => {
        console.log("ats ===", ats);
        setUsersArr(ats.data);
      })
      .catch((error) => {
        console.warn("įvyko klaida:", error);
      });
  }, []);
  // sugeneruoti html
  console.log("usersArr ===", usersArr);

  function handleNewUserSubmit(event) {
    event.preventDefault();
    console.log("js is in control");
  }

  return (
    <div>
      <h2>Users</h2>
      <h3>Add new user</h3>
      <form onSubmit={handleNewUserSubmit} className="border p-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={nameVal}
            onChange={(e) => setNameVal(e.target.value)}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="town" className="form-label">
            Town
          </label>
          <input
            value={townVal}
            onChange={(e) => setTownVal(e.target.value)}
            type="text"
            className="form-control"
            id="town"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            value={isDriver}
            onChange={(e) => setIsDriver(e.target.checked)}
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Driver
          </label>
        </div>
        <button className="btn btn-outline-info">Create</button>
      </form>
      <ul className="list-group">
        {usersArr.map((uObj) => (
          <li className="list-group-item" key={uObj.id}>
            (id: {uObj.id}) {uObj.name} yra is {uObj.town} vairuoja:{" "}
            {uObj.isDriver ? "Taip" : "Ne"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
