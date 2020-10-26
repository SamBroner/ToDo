import React from "react";
import { TodoList } from "../dataObjects/TodoDataObject";
import { FluidContext } from "./contextProvider";
import { useSelector } from "./hooks";

export interface IToDo {
    id: string;
    title: string;
    completed: boolean;
}

// Needs to inherit the context
export const getToDoSetters = () => {
    const dataObject = React.useContext(FluidContext) as TodoList;
    const { todos } = dataObject;
    return {
        addTodo: (title: string) => {
            const todo = {
                id: Date.now().toString(),
                title,
                completed: false,
            }
            todos.insert(todos.getItemCount(), [todo])
            // const subdir = todos.createSubDirectory(todo.id);
            // for (const k in todo) {
            //     subdir.set(k, todo[k]);
            // }
        },
        updateTodo: (id: string, todo: Partial<Omit<IToDo, "id">>) => {
            // todos.
            // const subdir = todos.getSubDirectory(id);
            // for (const [key, value] of Object.entries(todo)) {
            //     subdir.set(key, value);
            // }
        },
        deleteTodo: (id: string) => {
            // todos.deleteSubDirectory(id);
            // dataObject.emitEvent("todoSequence");
        }
    }
}

// the selectorFn is responsible for getting an IToDo[] from the TodoList
// Use UseSelector is responsible for keeping that IToDo[] up to date 
    // (and react then rerendering any dependent components)
export const getToDos = () => {
    return useSelector<IToDo[]>((todoList: TodoList) => {
        const todos = todoList.todos;
        // return Array.from(todos.subdirectories()).map<IToDo>(getDataFromSubdirectory);
        return todos.getItems(0);
    }, ["todoSequence"]);
}
