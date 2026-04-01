import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../api/axios";

function CreateProject() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", formData);

      navigate("/projects");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded w-96"
      >

        <h2 className="text-2xl mb-6">Create Project</h2>

        <input
          name="title"
          placeholder="Project Title"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          Create
        </button>

      </form>

    </div>
  );
}

export default CreateProject;