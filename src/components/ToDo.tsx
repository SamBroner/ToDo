import { TextField, List, Checkbox, FontIcon } from "@fluentui/react";
import * as React from "react";
import { getToDos, getToDoSetters, IToDo } from "../state/ToDoManager";


export const ToDos = () => {

    const todos = getToDos(); // Get ToDos
    const { addTodo, updateTodo } = getToDoSetters();
    // const { addTodo, updateTodo, deleteTodo } = getToDoSetters();

    const onRenderToDo = (todo?: IToDo) => {
        if (!todo) {
            return (<></>)
        }
        let editing = true;
        return (
            <div style={{ display: "flex", borderTop: "1px solid #e6e6e6" }}>
                <Checkbox
                    checked={todo.completed}
                    onChange={() => {
                        updateTodo(todo.id, { completed: !todo.completed });
                    }} />
                <TextField
                    readOnly={!editing}
                    borderless={!editing}
                    defaultValue={todo.title}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            console.log(e.currentTarget.value);
                            updateTodo(todo.id, {title: e.currentTarget.value})
                            e.currentTarget.value = "";
                            e.preventDefault();
                            editing = false;
                        }
                    }}
                />
                <div onClick={() => {
                    editing = true;
                    console.log("hello!")
                }}>
                    <FontIcon iconName={"Edit"} style={{
                        margin: '5px',
                    }} />
                </div>
                {/* CodeEditIcon */}
            </div>
        )
    }
    return (
        <div>
            <TextField
                label="With placeholder"
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