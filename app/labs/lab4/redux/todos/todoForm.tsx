"use client";

import React from "react";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex align-items-center gap-2">
      <FormControl
        className="me-2"
        defaultValue={todo.title}
        onChange={(e) =>
          dispatch(setTodo({ ...todo, title: e.target.value }))
        }
      />

      <Button
        className="btn btn-warning me-2"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click">
        Update
      </Button>

      <Button
        className="btn btn-success"
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click">
        Add
      </Button>
    </ListGroupItem>
  );
}