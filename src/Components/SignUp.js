import React, { useState } from 'react'
import { useHistory } from "react-router-dom";


const SignUp = () => {
    // const context = useContext(MovieContext)
    // const {createUser}=context
    const [User, setUser] = useState({name:"",email:"",contact:null,password:"",cpassword:""})
    let history = useHistory();

    const onChange = (e) => {
        setUser({...User,[e.target.name]: e.target.value });

      };
      const handleSubmit=(e)=>{
          e.preventDefault()
          createUser(User)


      }

      // Signup
      
  const createUser = async (User) => {
    const { name, email, contact, password } = User;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, contact, password }),
    });

    const user = await response.json();
    // console.log(user);
    if (user) {
      // Save the auth token and redirect
      localStorage.setItem("token", user.authtoken);
      history.push("/");
    } else {
      alert("Invalid credentials");
    }
  };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
  <div className="form-group col-6">
    <label htmlFor="name">Name</label>
    <input type="text" required className="form-control" id="name" name="name" onChange={onChange} value={User.name}/>
  </div>
  <div className="form-group col-6">
    <label htmlFor="email">Email address</label>
    <input type="email" required className="form-control" id="email" name="email"  placeholder="Enter email" onChange={onChange} value={User.email}/>
  </div>
  <div className="form-group col-6">
    <label htmlFor="contact">Contact</label>
    <input type="number" required className="form-control" name="contact" id="contact" onChange={onChange} value={User.contact}/>
  </div>
  <div className="form-group col-6">
    <label htmlFor="password">Password</label>
    <input type="password"  required className="form-control" id="password" name="password" onChange={onChange} value={User.password}  />
  </div>
  <div className="form-group col-6">
    <label htmlFor="cpassword">Confirm Password</label>
    <input type="password" required className="form-control" name="cpassword" id="cpassword" onChange={onChange} value={User.cpassword} />
    <div  className={`form-text text-danger ${User.password !== User.cpassword?"d-flex":"d-none"} `}>Password Doent Match</div>

  </div>
  
  <button disabled={User.password !== User.cpassword} type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default SignUp
