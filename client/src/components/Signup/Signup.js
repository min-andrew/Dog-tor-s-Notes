import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Button, Container, Header, Form, Segment } from "semantic-ui-react";

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
      <Segment basic textAlign={"center"}>
        <Header as="h2" textAlign="center">
          Sign-Up
        </Header>

        <div className="">
          <Form onSubmit={handleFormSubmit}>
            <Form.Field>
              <h4>
                <label htmlFor="username">Username:</label>
              </h4>
              <input
                className=""
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
                autocomplete="username"
                required
              />
            </Form.Field>
            <Form.Field>
              <h4>
                <label htmlFor="email">Email:</label>
              </h4>
              <input
                className=""
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
                <label htmlFor="password">Password:</label>
              </h4>
              <input
                className=""
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                autocomplete="new-password"
                required
              />
            </Form.Field>
            <Form.Field>
              <Button primary type="submit">
                Create Account
              </Button>
            </Form.Field>
          </Form>

          {error && <div className="">{error.message}</div>}
        </div>
      </Segment>
    </Container>
  );
};

export default Signup;
