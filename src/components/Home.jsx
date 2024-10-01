import React from "react";
import api from "../api";
import { useState, useEffect } from "react";

function Home() {
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  //function to fetchdata
  const getTodos = async () => {
    try {
      const response = await api.get("/api/todos/");
      setTodos(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteTodo = async (id) => {
    const response = await api
      .delete(`/api/todos/delete/${id}/`)
      .then((response) => {
        if (response.status === 204) {
          alert("Todo Deleted successfully!");
          setTodos(todos.filter((todo) => todo.id !== id));
        } else {
          alert("Failed to delete!");
        }
      });
  };

  //function to handle a new Todo
  const createNewTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("api/todos/", { title, date });
      setTodos([...todos, res.data]);

      setTitle("");
      setDate("");
      document.querySelector("#myModal .btn-close").click(); // Close modal
    } catch (error) {
      alert(error);
    }
  };

  //function to edit todo

  return (
    <>
      <h3 className="text-center">Todo List</h3>
      <div className="container">
        {/* Button to open the modal */}
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          + Add Todo
        </button>
      </div>

      {/* Modal */}
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Todo</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={createNewTodo}>
                <label htmlFor="todoTitle" className="form-label">
                  Todo Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="todoTitle"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />

                <label htmlFor="tododate" className="form-label">
                  Todo Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="tododate"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />

                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}

      <div className="modal" id="deletemodal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Delete Todo!!!</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <label className="form-label">
                Are you sure you want to delete?
              </label>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger "
                data-bs-dismiss="modal"
                onClick={() => deleteTodo(todoToDelete)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Todo container */}
      <div className="container border rounded shadow mt-5 py-2 mb-5">
        <div>
          <ol>
            {todos.map((todo, index) => (
              <li className="mb-2 p-2 " key={index}>
                <label className="col-sm-3 me-2">{todo.title} </label>
                <label className="col-sm-3 me-2">{todo.date}</label>
                <button
                  className="btn btn-danger col-sm-2 me-2"
                  data-bs-target="#deletemodal"
                  data-bs-toggle="modal"
                  onClick={() => setTodoToDelete(todo.id)}
                >
                  Delete
                </button>
                <button className="btn btn-primary col-sm-2">Edit</button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Home;
