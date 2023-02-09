import React, { useState, useEffect } from "react";
import {
  Segment,
  Button,
  Container,
  Header,
  Input,
  Form,
} from "semantic-ui-react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("localTodos")) {
      const storedTodo = JSON.parse(localStorage.getItem("localTodos"));
      setTodos(storedTodo);
    }
  }, []);

  const addTask = (e) => {
    if (todo) {
      const newTodo = { id: new Date().getTime().toString(), title: todo };
      setTodos([...todos, newTodo]);
      localStorage.setItem("localTodos", JSON.stringify([...todos, newTodo]));
      setTodo("");
    }
  };

  const handleDelete = (todo) => {
    const deleted = todos.filter((t) => t.id !== todo.id);
    setTodos(deleted);
    localStorage.setItem("localTodos", JSON.stringify(deleted));
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
  };

  return (
    <Container textAlign={"center"} style={containerStyle}>
      <Segment basic>
        <Header as="h2" textAlign="center">
          Todo List
        </Header>

        <div>
          You have
          {!todos.length
            ? " 0 tasks"
            : todos.length === 1
            ? " 1 tasks"
            : todos.length > 1
            ? ` ${todos.length} tasks`
            : null}{" "}
          remaining
        </div>

        {todos.map((todo) => (
          <React.Fragment key={todo.id}>
            <Segment style={{ margin: 10, width: 450 }}>
              <span style={{ fontWeight: "bold" }}>{todo.title}</span>

              <Button
                floated="right"
                basic
                color="red"
                size="mini"
                onClick={() => handleDelete(todo)}
              >
                X
              </Button>
            </Segment>
          </React.Fragment>
        ))}
      </Segment>

      <Form>
        <Input
          style={{ width: 380 }}
          name="todo"
          type="text"
          value={todo}
          placeholder="Todo"
          onChange={(e) => setTodo(e.target.value)}
        />

        <Button
          floated="right"
          basic
          color="blue"
          size="small"
          type="submit"
          onClick={addTask}
        >
          Add
        </Button>
      </Form>
    </Container>
  );
}

export default Todo;
