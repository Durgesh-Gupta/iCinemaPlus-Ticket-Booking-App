import React, { useContext, useRef, useState } from "react";
import MovieContext from "../../State/MovieContext";

const UserDetails = (props) => {
  const context = useContext(MovieContext);
  const { AllDetails, deleteUser ,updateUserd} = context;
  const users = AllDetails.users;
  console.log(typeof users);

  // Modal
  const ref = useRef(null)
  const refClose = useRef(null)
  const [euser, seteuser] = useState({id: "",ename:"",eemail:"", econtact: ""})

  const updateUser = (user) => {
    ref.current.click();

    seteuser({id: user._id, ename: user.name, eemail: user.email,econtact:user.contact})
}

const handleClick = (e)=>{ 
  // console.log(e)
  updateUserd({id:euser.id,name:euser.ename,email:euser.eemail,contact:euser.econtact})

    refClose.current.click();
}
const onChange = (e)=>{
  seteuser({...euser, [e.target.name]: e.target.value})
}







  return (
    <div>
      <h1>User</h1>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Is Deleted</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <th scope="row">
                  <span className={`badge bg-${user.IS_DELETE ? "danger" : "success"}`}>{user.IS_DELETE ? "True" : "False"}</span>
                  {}
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.contact}</td>
                <td>
                  <i
                    className="bi bi-trash mx-2"
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  ></i>
                  <i
                    className="bi bi-pencil-square mx-2"
                    onClick={() => {
                      updateUser(user);
                    }}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      // Update Modal
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Name
                  </label>
                  <input disabled
                    type="text"
                    className="form-control"
                    id="ename"
                    name="ename"
                    value={euser.ename}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Contact
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="econtact"
                    name="econtact"
                    value={euser.econtact}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eemail"
                    name="eemail"
                    value={euser.eemail}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                // disabled={
                //   showtime.ename.length < 5 || showtime.econtact.length < 5
                // }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
