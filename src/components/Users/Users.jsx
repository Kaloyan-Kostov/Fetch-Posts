import { useState } from "react";
import { FETCH_URL } from "../../helpers/constants";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${FETCH_URL}/users`);
      const userData = await response.json();
      setUsers(userData);
    } catch (e) {
      console.log("Error", e);
    }
  };

  const handleDisplay = () => {
    if (!isDisplayed) {
      fetchUsers();
    }
    setIsDisplayed(!isDisplayed);
  };

  return (
    <div>
      <div className="flex">
        <button className="rounded-sm border mb-5 p-1" onClick={handleDisplay}>
          {isDisplayed ? "Unfilter" : "Filter"}
        </button>
      </div>
      <div>
        {isDisplayed &&
          users.map((user) => <div key={user.id}>{user.name}</div>)}
      </div>
    </div>
  );
};

export default Users;
