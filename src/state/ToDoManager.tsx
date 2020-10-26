import { ISharedDirectory } from "@fluidframework/map";
import React from "react";
import { TodoList } from "../dataObjects/main";
import { FluidContext } from "./contextProvider";
import { getDataFromSubdirectory, useSelector } from "./hooks";

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
            const subdir = todos.createSubDirectory(todo.id);
            for (const k in todo) {
                subdir.set(k, todo[k]);
            }
        },
        updateTodo: (id: string, todo: Partial<Omit<IToDo, "id">>) => {
            const subdir = todos.getSubDirectory(id);
            for (const [key, value] of Object.entries(todo)) {
                subdir.set(key, value);
            }
        },
        deleteTodo: (id: string) => {
            todos.deleteSubDirectory(id);
            dataObject.emitEvent("todoDirectory");
        }
    }
}

// the selectorFn is responsible for getting an IToDo[] from the TodoList
// Use UseSelector is responsible for keeping that IToDo[] up to date 
    // (and react then rerendering any dependent components)
export const getToDos = () => {
    return useSelector<IToDo[]>((todoList: TodoList) => {
        const todos: ISharedDirectory = todoList.todos;
        return Array.from(todos.subdirectories()).map<IToDo>(getDataFromSubdirectory);
    }, ['todoDirectory']);
}
