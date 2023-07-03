import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3010/users");
        const usersData = response.data;
        setUsers(usersData);
      } catch (error) {
        console.log("Error while fetching users");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3010/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log("Error while deleting user");
    }
  };

  const handleUpdate = async (id, newUser) => {
    try {
      await axios.patch(`http://localhost:3010/users/${id}`, newUser);
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.log("Error while updating user");
    }
  };

  return (
    <div className="mb-5">
      <div className="container w-50">
        {users.map((user) => (
          <UserCard
            key={user._id}
            profile={user.profile}
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            phone={user.phone}
            address={user.address}
            deleteUser={() => handleDelete(user._id)}
            updateUser={(updatedUser) => handleUpdate(user._id, updatedUser)}
          ></UserCard>
        ))}
      </div>
    </div>
  );
};

export default Users;
