import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";

import Footer from "../../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

const sign = require("jwt-encode");

const Signup = () => {
  const [termsCondition, settermsCondition] = useState(false);
  const [loginTermsCondition, setloginTermsCondition] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {}, []);

  const djangoUserAPi = {
    home: "http://localhost:8000/userApi/",
    signup: "http://localhost:8000/userApi/signup",
  };

  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  // const [loggedInfo, setloggedInfo] = useState([])

  const inputOnChange = (e) => {
    if (e.target.name === "fullName") {
      setfullName(e.target.value);
    }

    if (e.target.name === "email") {
      setemail(e.target.value);
    }

    if (e.target.name === "password") {
      setpassword(e.target.value);
    }

    if (e.target.name === "loginEmail") {
      setloginEmail(e.target.value);
    }

    if (e.target.name === "loginPassword") {
      setloginPassword(e.target.value);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // console.log("handle submit ");

    // console.log(fname ,lname , email , password)

    // console.log( djangoUserAPi.signup  )

    var session_url = "http://localhost:8000/vendorApi/signup";

    let fullname = fullName;
    let emailAddress = email;
    let passwords = password;

    axios
      .post(session_url, { fullname, emailAddress, passwords })

      .then(function (response) {
        if (response.data.msg === "VendorSignUpSuccessfull") {
          alert("VendorSignUpSuccessfull");
          setfullName("");
          setemail("");
          setpassword("");

          // window.location.replace("/vendorsignup")
          // navigate("/vendorsignup");
        } else {
          alert(response.data.msg);
        }
      })

      .catch(function (error) {
        // console.log(error , "AXIOS  error");
      });

    // -----------------------
  };

  const handleLoginOnSubmit = (e) => {
    e.preventDefault();

    let loginEmailId = loginEmail;
    let loginPasswords = loginPassword;

    var sessionUrl = "http://localhost:8000/vendorApi/vendorLogin";

    axios
      .post(sessionUrl, {
        loginEmailId,
        loginPasswords,
      })

      .then(function (response) {
        if (response.data.msg === "VendorLoggedIn") {
          // console.log("VendorLoggedIn")

          // console.log("toki- " , response.data.token )

          var decoded = jwtDecode(response.data.token);
          // console.log("jwtDecode is " , decoded )

          localStorage.setItem("vendorLoginToken", response.data.token);

          // navigation("/vendor")

          // setloggedInfo(response.data.fetchDetails)
          window.location.replace("/vendor");
        } else {
          alert(response.data.msg);
        }
      })

      .then(function (error) {
        // console.log("Axios Error "  ,  error)
      });
  };

  return (
    <>
      <Header />

      <div style={{ backgroundColor: "#f1f3f6" }} data-cy="vendorSignInSignUp">
        <h2 className="text-center pt-5 text-bold"> Vendor signup signin </h2>

        <div className="container row">
          <div className="col-sm-1"></div>

          <div
            className="col-sm-5 py-5 px-5  "
            style={{ backgroundColor: "#fff", margin: "0 50px 0 0" }}
          >
            <h1 className="text-center mt-3">Login </h1>

            <form method="POST" onSubmit={handleLoginOnSubmit}>
              <div className="form-floating mt-5 mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  data-cy="login Email"
                  name="loginEmail"
                  onChange={inputOnChange}
                  placeholder=""
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="loginfloatingPassword"
                  placeholder=""
                  data-cy="login Password"
                  name="loginPassword"
                  onChange={inputOnChange}
                />
                <label htmlFor="loginfloatingPassword">Password</label>
              </div>

              <div class="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="signUpTerms"
                  checked={loginTermsCondition}
                  data-cy="signup termsCondition"
                />
                <label
                  id="loginTerms"
                  className="form-check-label"
                  for="signUpTerms"
                  onClick={() => setloginTermsCondition(!loginTermsCondition)}
                >
                  I accept all terms and condition
                </label>
              </div>

              <input
                type="submit"
                value="Login "
                data-cy="login button"
                disabled={!loginTermsCondition}
                className="w-100 btn btn-primary btn-lg px-5 mt-3 mb-5"
              />
            </form>
          </div>

          <div
            className="col-sm-5 py-5 px-5 "
            style={{ backgroundColor: "#fff" }}
          >
            <h1 className="text-center mt-2">Sign Up </h1>

            <form method="post" onSubmit={handleSignupSubmit}>
              <div className="form-floating mb-3 mt-5">
                <input
                  type="text"
                  className="form-control"
                  id="floatingFname"
                  placeholder="First Name"
                  name="fullName"
                  onChange={inputOnChange}
                  value={fullName}
                  data-cy="signup fname"
                  required
                />
                <label htmlFor="floatingFname">Full Name </label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Your Email"
                  name="email"
                  data-cy="signup email"
                  value={email}
                  onChange={inputOnChange}
                  required
                />
                <label htmlFor="floatingEmail">Your address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={inputOnChange}
                  data-cy="signup password"
                  required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="signUpTerms"
                  checked={termsCondition}
                  data-cy="signup termsCondition"
                />
                <label
                  id="signUpTerms"
                  className="form-check-label"
                  for="signUpTerms"
                  onClick={() => settermsCondition(!termsCondition)}
                >
                  I accept all terms and condition
                </label>
              </div>

              <input
                type="submit"
                data-cy="signup button"
                value="Sign Up"
                disabled={!termsCondition}
                className="w-100 btn btn-primary btn-lg px-5 mt-3 mb-5"
              />
            </form>
          </div>

          <div className="col-sm-1"></div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
