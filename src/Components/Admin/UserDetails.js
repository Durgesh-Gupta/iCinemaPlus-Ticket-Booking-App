import React,{useContext} from "react";
import MovieContext from "../../State/MovieContext";

const UserDetails = (props) => {
  const context = useContext(MovieContext);
  const { AllDetails,deleteUser } = context;
  const users= AllDetails.users;
  console.log(typeof users);
  return (
    <div>
      <h1>User</h1>
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
      {users.map((user) => {
        return <tr key={user._id}>
        <th scope="row"></th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.contact}</td>
        <td><i
              className="bi bi-trash mx-2"
              onClick={() => {
                deleteUser(user._id);
              }}
            ></i>
            <i
              className="bi bi-pencil-square mx-2"
              // onClick={() => {
              //   updateMovie(movie);
              // }}
            ></i></td>
      </tr>;
      })}
          
         
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
