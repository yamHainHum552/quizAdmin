"use client";
import { FaCirclePlus } from "react-icons/fa6";
import Loader from "@/components/loader/Loader";
import Modal from "@/components/modal/Modal";
import React, { useEffect, useState } from "react";

function Category({ category }) {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const getQuestions = async (category) => {
      try {
        setLoading(true);
        let data = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/${category}/getData`
        );
        if (!data) {
          throw new Error("Error fetching the product");
        }
        data = await data.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions(category);
  }, [category]);

  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setModalType("edit");
    setModalOpen(true);
  };

  const handleAdd = () => {
    setModalType("add");
    setModalOpen(true);
  };
  const handleDelete = (question) => {
    setSelectedQuestion(question);
    setModalType("delete");
    setModalOpen(true);
  };

  return (
    <div className="p-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isSearching && (
            <div className="flex sm:justify-between sm:flex-row flex-col items-center">
              <h1 className="sm:text-2xl text-xl font-bold mb-4">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h1>
              <div className="sm:block hidden">
                <button onClick={handleAdd}>
                  <FaCirclePlus color="white" size={40} />
                </button>
              </div>
              <div className="sm:hidden block fixed right-5 bottom-5">
                <button onClick={handleAdd}>
                  <FaCirclePlus color="white" size={40} />
                </button>
              </div>

              <h1 className="sm:text-2xl text-xl font-bold mb-4">
                {"Questions: " + questions.length}
              </h1>
            </div>
          )}

          <div className="w-full max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search questions..."
              className="border-none p-2 mb-4 w-full rounded text-black mt-5"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsSearching(true);
              }}
            />

            {/* Questions List */}
            <div className="space-y-4">
              {questions
                .filter((q) =>
                  q.question.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((question) => (
                  <div
                    key={question.id}
                    className="bg-white p-4 shadow rounded-lg"
                  >
                    <div>
                      <h2 className="text-lg text-black font-bold">
                        {question.question}
                      </h2>
                      <ul className="list-disc list-inside mb-2">
                        {question.options.map((option, index) => (
                          <li key={index} className="text-sm text-black">
                            {option}
                          </li>
                        ))}
                      </ul>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleEdit(question)}
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(question)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              questionData={
                modalType === "edit" || modalType === "delete"
                  ? selectedQuestion
                  : null
              }
              setModalOpen={setModalOpen}
              category={category}
              modalType={modalType}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Category;
