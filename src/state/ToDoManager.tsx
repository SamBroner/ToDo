import React from "react";
import { Main } from "../dataObjects/main";
import { FluidContext } from "./contextProvider";
import { getDataFromSubdirectory, useSelector } from "./hooks";

export interface IToDo {
    id: string;
    title: string;
    completed: boolean;
}

export const getToDoSetters = () => {
    const dataObject = React.useContext(FluidContext) as Main;
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
        deleteTodo: () => {

        }
    }
}

export const getToDos = () => {
    return useSelector<IToDo[]>(({ todos }) => {
        return Array.from(todos!.subdirectories()).map<IToDo>(getDataFromSubdirectory);
    }, ['todoDirectory']);
}
