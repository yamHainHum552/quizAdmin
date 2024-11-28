"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

function ClientModal({
  isOpen,
  questionData = null,
  setModalOpen,
  category,
  modalType,
}) {
  const [question, setQuestion] = useState(questionData?.question || "");
  const [id, setId] = useState(questionData?.id | "");
  const [options, setOptions] = useState(
    questionData?.options || ["", "", "", ""]
  );
  const [answer, setAnswer] = useState(questionData?.answer || "");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCreate = async () => {
    if (!question || options.some((opt) => !opt) || !answer) {
      alert("Please fill in all fields.");
      return;
    }
    const data = { id, question, options, answer };
    try {
      setLoading(true);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/create/${category}`,
        {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      if (response) {
        toast.success("Added Successfully");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
    setLoading(false);
    setModalOpen(false);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setId("");
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/delete/${category}`,
        {
          body: JSON.stringify({ id }),
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      if (response) {
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
    setLoading(false);
    setModalOpen(false);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setId("");
  };

  const handleSubmit = async () => {
    if (modalType === "edit") {
      await handleUpdate();
    } else if (modalType === "add") {
      await handleCreate();
    } else {
      await handleDelete();
    }
  };
  const handleUpdate = async () => {
    if (!question || options.some((opt) => !opt) || !answer) {
      alert("Please fill in all fields.");
      return;
    }
    const data = { id, question, options, answer };
    try {
      setLoading(true);
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/update/${category}`,
        {
          body: JSON.stringify(data),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      console.log(response);
      if (response) {
        toast.success("Updated Successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false);
    setModalOpen(false);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setId("");
  };

  const ShowSubmitText = () => {
    if (loading) {
      if (modalType === "edit") return "Updating...";
      else if (modalType === "add") return "Adding...";
      else return "Deleting...";
    } else {
      if (modalType === "edit") return "Update";
      else if (modalType === "add") return "Create";
      else return "Delete";
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 background text-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
        {/* Question Input */}
        {modalType !== "delete" ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {questionData ? "Edit Question" : "Add Question"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">ID:</label>
                <input
                  className="border rounded w-full p-2"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Enter Question Id"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Question:</label>
                <textarea
                  className="border rounded w-full p-2"
                  rows="1"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your question here"
                />
              </div>
              {/* Options Inputs */}
              {options.map((option, index) => (
                <div key={index}>
                  <label className="block font-medium mb-1">
                    Option {index + 1}:
                  </label>
                  <input
                    type="text"
                    className="border rounded w-full p-2"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Enter option ${index + 1}`}
                  />
                </div>
              ))}
              {/* Answer Input */}
              <div>
                <label className="block font-medium mb-1">Answer:</label>
                <select
                  className="border rounded w-full p-2"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                >
                  <option value="">Select the correct answer</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      Option {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-2xl text-red-600">
              Are you sure you want to delete this question ?
            </h1>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {ShowSubmitText()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientModal;
