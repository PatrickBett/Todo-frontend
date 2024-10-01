import React from "react";

function Upcoming() {
  return (
    <>
      <h3 className="text-center">Upcoming Todo List</h3>

      {/* Todo container */}
      <div className="container border rounded shadow mt-5 py-2 mb-5">
        <div>
          <ol>
            <li className="mb-2 p-2 ">
              <label className="col-sm-3 me-2">todo.title </label>
              <label className="col-sm-3 me-2">todo.description</label>
              <button
                className="btn btn-danger col-sm-2 me-2"
                data-bs-target="#deletemodal"
                data-bs-toggle="modal"
              >
                Delete
              </button>
              <button className="btn btn-primary col-sm-2">Edit</button>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}

export default Upcoming;
