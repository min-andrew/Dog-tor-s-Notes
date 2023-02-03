import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Container, Header, Form, Segment } from "semantic-ui-react";

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
      <Segment basic textAlign={"center"}>
        <Header as="h2" textAlign="center">
          Login
        </Header>

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
              placeholder="*****"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
          </Form.Field>

          <Form.Field>
            <Button primary type="submit">
              Login
            </Button>
          </Form.Field>
        </Form>

        {error && <div className="">{error.message}</div>}
      </Segment>
    </Container>
  );
};

export default Login;
