import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Divider, Container, Header, Form } from "semantic-ui-react";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Container>
      <div className="">
        <div className="">
          <Header as="h2" textAlign="center">
            Login
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
                  <label for="email">Email</label>
                  <input
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label for="password">Password</label>
                  <input
                    placeholder="********"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Button primary style={{ cursor: "pointer" }} type="submit">
                    Login
                  </Button>
                </Form.Field>
                <Form.Field>
                  <Divider horizontal>Or</Divider>

                  <Button secondary basic type="submit">
                    <Link to="/signup">Create Account</Link>
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

export default Login;
