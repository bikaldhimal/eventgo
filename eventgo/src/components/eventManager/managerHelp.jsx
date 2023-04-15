import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "./../../axios";
import "react-toastify/dist/ReactToastify.css";

const ManagerHelp = () => {
  const [showHide, setShowHide] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitFeedback = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      handleEmptyFields();
    }

    const userId = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("role", localStorage.getItem("role"));

    axios
      .post(`/feedback/${userId}`, formData)
      .then((response) => {
        console.log(response.data);
        handleSuccess();
      })
      .catch((err) => {
        handleError();
      });
  };

  const handleEmptyFields = () => {
    if (!toast.isActive("empty-fields")) {
      toast.error("The fields are empty!", {
        position: "top-right",
        autoClose: 2000,
        toastId: "empty-fields",
      });
    }
  };

  const handleSuccess = () => {
    if (!toast.isActive("empty-fields")) {
      toast.success("Feedback submitted successfully", {
        position: "top-right",
        autoClose: 2000,
        toastId: "empty",
      });
    }
  };

  const handleError = () => {
    if (!toast.isActive("empty-fields")) {
      toast.error("Error in server", {
        position: "top-right",
        autoClose: 2000,
        toastId: "empty-fields",
      });
    }
  };

  return (
    <>
      <ol className="relative border-l border-gray-200 dark:border-gray-700">
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Support
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Provide feedback and support to EventGO
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Please do not hesitate to contact us if you have any queries
            regarding the application features, layout, and functionalities. So
            that we can improve our productivity in future updates.
          </p>
          <a
            href="#"
            onClick={() => setShowHide((prev) => !prev)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Provide Feedback
            <svg
              className="w-3 h-3 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          {/* feedback form */}
          {showHide && (
            <form
              type="submit"
              // encType="multipart/form-data"
              className="feedbackForm flex flex-col justify-start items-start mt-3 gap-3"
            >
              <div className="flex flex-col lg:items-start items-center w-full px-2 gap-2 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <button
                  type="submit"
                  className="inline-flex justify-center text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <label className="block">
                    <span className="sr-only">Choose File</span>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </label>
                </button>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white text-gray-900 rounded-lg border  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Title"
                />
                <textarea
                  id="chat"
                  rows="6"
                  className="block mx-4 lg:mx-0 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your feedback here..."
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  submitFeedback(e);
                }}
                className="inline-flex justify-start items-center gap-2 py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <MdSend />
                Send
              </button>
            </form>
          )}
          {/* feedback form end */}
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Overview
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline hover:text-blue-700 hover:decoration-blue-700">
            <Link to="/manager/overview">
              View and analyze the dashboard for your events
            </Link>
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            The overview section contains the dashboard for analyzing the events
            and their related attributes.
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Events
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline hover:text-blue-700 hover:decoration-blue-700">
            <Link to="/manager/event/add">
              Create and manipulate your events
            </Link>
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            The events section assist you creating, analyzing, and manipulating
            your events along with Todo
          </p>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Artist
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline hover:text-blue-700 hover:decoration-blue-700">
            <Link to="/manager/artist">View available artist</Link>
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            The Artist section contains the list of artists you can follow or
            start converstaion with.
          </p>
        </li>
        <li className="ml-4">
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Message
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline hover:text-blue-700 hover:decoration-blue-700">
            <Link to="/manager/message">
              Start conversations with event manager and artist
            </Link>
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            The message section contains the conversation with the event manager
            and artist and see all the available users.
          </p>
        </li>
      </ol>
      <ToastContainer />
    </>
  );
};

export default ManagerHelp;
