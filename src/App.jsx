import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

function App() {
  const initialValue = { user: "", email: "", pass: "" };
  const [formValues, setFormValues] = useState(initialValue);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setFormSubmit(true);
    if (Object.keys(validate(formValues)).length === 0) {
      emailjs
        .sendForm(
          "service_dj7jdk5",
          "template_nfaf6sa",
          form.current,
          "baClcK0EjH8Zo-W17"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && formSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formSubmit, formValues]);

  const validate = (v) => {
    const errors = {};
    const regex = /^[^\s@]+@[^s@]+\.[^\s@]{2,}$/i;
    if (!v.user) {
      errors.user = "Korisničko ime nije ispravno upisano";
    }
    if (!v.email) {
      errors.email = "E-mail nije upisan";
    } else if (!regex.test(v.email)) {
      errors.email = "Email nije ispravan";
    }
    if (!v.pass) {
      errors.pass = "Lozinka nije uspisana";
    } else if (v.pass.length < 6) {
      errors.pass = "Lozinka mora imati više od 6 znakova";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && formSubmit && (
        <div className="title">Uspješno ste se ulogirali</div>
      )}
      <form ref={form} onSubmit={handleSubmit}>
        <h1>Login Forma</h1>
        <hr />
        <div className="form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="user"
              placeholder="username"
              value={formValues.user}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.user}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="pass"
              placeholder="password"
              value={formValues.pass}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.pass}</p>
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
