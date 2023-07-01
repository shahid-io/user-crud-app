import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { BsArrowReturnLeft } from "react-icons/bs";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
    <div className="container mt-3">
      <div className="p-3">
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
        <Link className="end">
          <BsArrowReturnLeft
            className="back-btn"
            size={40}
            onClick={() => navigate(-1)}
          />
        </Link>
      </div>
    </div>
  );
};

export default Users;
