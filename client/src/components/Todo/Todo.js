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

  return (
    <Container textAlign="center">
      <Segment basic textAlign={"center"}>
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
            <Segment style={{ margin: 10 }}>
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
          style={{ width: 450 }}
          name="todo"
          type="text"
          value={todo}
          placeholder="Todo"
          onChange={(e) => setTodo(e.target.value)}
        />

        <Button
          floated="right"
          // style={{ marginleft: 10 }}
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
