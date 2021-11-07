import React from "react";
import UserContext from "./UserContext";
import { useHistory } from 'react-router-dom'


const UserState = (props) => {
    const host="http://localhost:5000"
    let history = useHistory();

    const createUser =async (User)=>{
        const {name,email,contact,password}=User
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body:JSON.stringify({name,email,contact,password})
          });
      
          const user = await response.json();
          console.log(user)
          if (user){
            // Save the auth token and redirect
            localStorage.setItem('token', user.authtoken); 
            history.push("/");

        }
        else{
            alert("Invalid credentials");
        }
        }

  return (
    <UserContext.Provider
      value={{ createUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
