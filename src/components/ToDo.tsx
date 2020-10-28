import { Text, TextField, List, Checkbox, FontIcon, ITextField } from "@fluentui/react";
import * as React from "react";
import { getToDos, getToDoSetters, getToDoString, IToDo } from "../state/todoListManager";

export const ToDos = () => {

    const todos = getToDos(); // Get ToDos
    const todoText = getToDoString();

    const { addTodo, updateTodo, deleteTodo, updateTodoText } = getToDoSetters();

    const ToDoItemComponent = (todo?: IToDo) => {
        if (!todo) {
            return (<></>)
        }
        return (
            <div style={{ display: "flex", borderTop: "1px solid #e6e6e6" }}>
                <Checkbox
                    checked={todo.completed}
                    onChange={() => {
                        updateTodo(todo.id, { completed: !todo.completed });
                    }} />
                <Text>
                    {todo.title}
                </Text>
                <a onClick={() => {
                    deleteTodo(todo.id)
                }}>
                    <FontIcon iconName={"Delete"} style={{
                        margin: '5px',
                    }} />
                </a>
            </div>
        )
    }
  const fieldRef = React.createRef<ITextField>();

    return (
        <div>
            <TextField
                placeholder="What needs to be done?"
                componentRef={fieldRef}

                onChange={(e, text) => {
                    if (text) { updateTodoText(text); }
                }}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        addTodo(todoText);
                        updateTodoText("");
                        e.currentTarget.value = "";
                        e.preventDefault();
                    }
                }}
                value={todoText}
            />
            {todos.length > 0 ? (
                <List items={todos} onRenderCell={ToDoItemComponent} />
            ) : (
                    <></>
                )}
        </div>
    )
}