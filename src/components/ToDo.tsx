import { Text, TextField, List, Checkbox, FontIcon } from "@fluentui/react";
import * as React from "react";
import { getToDos, getToDoSetters, IToDo } from "../state/ToDoManager";


export const ToDos = () => {

    const todos = getToDos(); // Get ToDos
    const { addTodo, updateTodo, deleteTodo } = getToDoSetters();

    const onRenderToDo = (todo?: IToDo) => {
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
                {/* <FontIcon iconName={"Edit"} style={{margin: '5px' }} /> */}
                <a onClick={() => {
                    console.log("delete")
                    deleteTodo(todo.id)
                }}>
                    <FontIcon iconName={"Delete"} style={{
                        margin: '5px',
                    }} />
                </a>
            </div>
        )
    }
    return (
        <div>
            <TextField
                placeholder="What needs to be done?"
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        addTodo(e.currentTarget.value)
                        e.currentTarget.value = "";
                        e.preventDefault();
                    }
                }}
            />
            {todos.length > 0 ? (
                <List items={todos} onRenderCell={onRenderToDo} />
            ) : (
                    <></>
                )}
        </div>
    )
}