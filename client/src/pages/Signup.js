import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Container, Header, Form } from "semantic-ui-react";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <div className="">
        <div className="">
          <Header as="h2" textAlign="center">
            Sign-Up
          </Header>
          <div className="">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                  <label htmlFor="username">Username:</label>
                  <input
                    className=""
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="email">Email:</label>
                  <input
                    className=""
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="password">Password:</label>
                  <input
                    className=""
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Button primary type="submit">
                    Create Account
                  </Button>
                </Form.Field>
              </Form>
            )}

            {error && <div className="">{error.message}</div>}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
