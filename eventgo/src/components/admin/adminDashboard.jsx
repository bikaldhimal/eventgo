import React, { useState, useEffect } from "react";
import axios from "./../../axios";
import { Link, useNavigate } from "react-router-dom";
import { SiEventbrite, SiGoogleanalytics } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const email = users.email;
  useEffect(() => {
    axios
      .get("/admin/users", { email })
      .then((response) => {
        setUsers(response.data);
        navigate("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSuccess = () => {
    if (!toast.isActive("empty-fields")) {
      toast.success("User deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        toastId: "empty",
      });
    }
  };

  const handleError = () => {
    if (!toast.isActive("empty-fields")) {
      toast.error("Server error", {
        position: "top-right",
        autoClose: 2000,
        toastId: "empty-fields",
      });
    }
  };

  // const refreshPage = () => {
  //   navigate("/admin");
  // };

  const handleDelete = (user) => {
    console.log(user);
    axios
      .delete(`/admin/users/${user}`)
      .then((response) => {
        console.log(response);
        // refreshPage();
        handleSuccess();
      })
      .catch((error) => {
        console.log(error);
        handleError();
      });
  };

  return (
    <>
      <div className="container mx-auto min-h-screen overflow-hidden overflow-y-auto bg-slate-50 p-5 rounded-md">
        {/* <!-- Header --> */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              Admin Dashboard
            </h1>
          </div>
        </div>
        <div className="grid grid-flow-row gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* card */}
          <div className="bg-white shadow-md shadow-gray-300 rounded-lg relative w-fit mt-8">
            <div className="flex justify-center items-center absolute -top-5 left-4 bg-blue-500/80 p-6 rounded-2xl shadow-lg shadow-blue-500/50 text-white w-fit">
              <SiEventbrite />
            </div>
            <div className="flex flex-col justify-end w-full items-end pl-48 overflow-hidden pr-4 pt-4 gap-1">
              <p className="text-sm font-light text-end tracking-wide">
                Total Users
              </p>
              <p className="text-xl font-medium text-end tracking-wide">
                {users.length}
              </p>
            </div>
            <hr className="mt-5" />
            <div className="flex justify-start items-center py-2 pl-1">
              <p className="p-3 text-green-500 text-md font-medium">+55%</p>
              <p>than last week</p>
            </div>
          </div>
          {/* card end */}
          {/* card */}
          <div className="bg-white shadow-md shadow-gray-300 rounded-lg relative w-fit mt-8">
            <div className="flex justify-center items-center absolute -top-5 left-4 bg-amber-500/80 p-6 rounded-2xl shadow-lg shadow-amber-500/50 text-white w-fit">
              <SiGoogleanalytics />
            </div>
            <div className="flex flex-col justify-end w-full items-end pl-48 overflow-hidden pr-4 pt-4 gap-1">
              <p className="text-sm font-light text-end tracking-wide">
                Total Sales
              </p>
              <p className="text-xl font-medium text-end tracking-wide">
                $10900
              </p>
            </div>
            <hr className="mt-5" />
            <div className="flex justify-start items-center py-2 pl-1">
              <p className="p-3 text-green-500 text-md font-medium">+55%</p>
              <p>than last week</p>
            </div>
          </div>
          {/* card end */}
        </div>

        {/* Showing available users */}
        <div className="flex flex-col">
          {/* <!-- Main Content --> */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto py-8">
              <div className="my-6">
                <h2 className="text-xl font-bold text-gray-700">Users</h2>
                <table className="w-full bg-white shadow-md rounded my-6">
                  <thead className="border-b-2">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-gray-600">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-gray-600">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-gray-600">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-gray-600">
                        Active Status
                      </th>
                      <th className="px-6 py-4 text-left font-bold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <!-- User Row --> */}
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b">
                          <div className="text-sm text-gray-900">
                            {user.role}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b">
                          {user.isActive == true ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              active
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-black">
                              inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b">
                          <div className="flex items-center">
                            <div className="mr-4 xl:space-x-2 space-y-2">
                              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Suspend
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(user._id);
                                }}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminDashboard;
