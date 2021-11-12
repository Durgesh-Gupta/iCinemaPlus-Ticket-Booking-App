import React from "react";

const UserDetails = (props) => {
  const { users } = props.AllDetails;
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
          </tr>
        </thead>
        <tbody>
      {users.map((user) => {
        return <tr>
        <th scope="row"></th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.contact}</td>
      </tr>;
      })}
          
         
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
