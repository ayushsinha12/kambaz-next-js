"use client";

import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: any) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <span>{todo.title}</span>

      <div>
        <Button
          className="btn btn-primary me-2"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click">
          Edit
        </Button>

        <Button
          className="btn btn-danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click">
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}