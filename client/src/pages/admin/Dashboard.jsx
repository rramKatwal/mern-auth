import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import axios from "axios";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { token } = useSelector((state) => state.auth);

  // getallusers
  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${window.location.origin}/users/all-users`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getUsers();
    }
  }, []);

  //deleteuser
  const deleteUser = async (id) => {
    try {
      // Confirm the deletion before sending the request
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user account?"
      );
      if (!confirmDelete) {
        return; // Exit the function if the user cancels the deletion
      }

      const res = await axios.delete(
        `${window.location.origin}/users/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data?.success) {
        toast.success("User deleted successfully.");
        getUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong.");
    }
  };

  return (
    <>
      <Layout>
        <div className="container mt-5">
          <div className="row mt-5">
            <div className="col-md-12">
              <Table className="admintable" striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Photo</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name} </td>
                      <td>{user.email} </td>
                      <td>{user.phone}</td>
                      <td>{user.address} </td>
                      <td>{user.role} </td>
                      <td>
                        <img
                          src={`${window.location.origin}/images/${user.profileImage}`}
                          alt="profile"
                          height="48px"
                          style={{ borderRadius: "50%" }}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className=" btn text-danger"
                          onClick={() => deleteUser(user._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
