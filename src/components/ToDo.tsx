import { TextField, List } from "@fluentui/react";
import * as React from "react";
import { getToDos, IToDo } from "../state/ToDoManager";


export const ToDos = () => {

    const todos = getToDos(); // Get ToDos
    // const { addItem, updateItem, deleteItem } = getToDoSetters();

    const onRenderToDo = (todo?: IToDo) => {
        if (!todo) {
            return (<></>)
        }

        return (
            <h1>
                hello world
            </h1>
        )
    }
    return (
        <div>
            <TextField 
                label="With placeholder" 
                placeholder="What needs to be done?"
                // onChange={(e)} 
            />
            {todos.length > 0 ? (
                <List items={todos} onRenderCell={onRenderToDo} />
            ) : (
                <></>
            )}
        </div>
    )
}