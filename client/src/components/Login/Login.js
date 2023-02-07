import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import {
  Button,
  Container,
  Header,
  Form,
  Segment,
  Divider,
} from "semantic-ui-react";
import Signup from "../Signup/Signup";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [hideState, setHideState] = useState({
    signin: {},
    create: {
      display: "none",
    },
  });

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

  const hider = async () => {
    setHideState({
      signin: {
        display: "none",
      },
      create: {
        display: "block",
      },
    });
  };

  const shower = async () => {
    setHideState({
      signin: {
        display: "block",
      },
      create: {
        display: "none",
      },
    });
  };

  return (
    <div>
      <Container style={hideState.signin}>
        <Segment basic textAlign={"center"}>
          <Header as="h2" textAlign="center">
            Welcome
          </Header>
          <Form onSubmit={handleFormSubmit}>
            <Form.Field>
              <h4>
                <label htmlFor="email">Email</label>
              </h4>
              <input
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                autocomplete="email"
                required
              />
            </Form.Field>

            <Form.Field>
              <h4>
                <label htmlFor="password">Password</label>
              </h4>
              <input
                placeholder="*****"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                autocomplete="current-password"
                required
              />
            </Form.Field>

            <Form.Field>
              <Button primary type="submit">
                Login
              </Button>
            </Form.Field>
          </Form>
          <Form.Field>
            <Divider horizontal>Or</Divider>

            <Button primary basic onClick={hider}>
              Create Account
            </Button>
          </Form.Field>

          {error && <div>{error.message}</div>}
        </Segment>
      </Container>
      <div style={hideState.create}>
        <Signup />
        <Form.Field>
          <Divider horizontal>Or</Divider>
        </Form.Field>
        <Segment basic textAlign={"center"}>
          <Form.Field>
            <Button primary basic onClick={shower}>
              Login
            </Button>
          </Form.Field>
        </Segment>
      </div>
    </div>
  );
};

export default Login;
