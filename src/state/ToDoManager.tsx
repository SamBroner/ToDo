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
    console.log(dataObject)
    return {
        addItem: () => {

        },
        updateItem: () => {

        },
        deleteItem: () => {

        }
    }
}

export const getToDos = () => {
    return useSelector<IToDo[]>(({ myDir }) => {
        return Array.from(myDir!.subdirectories()).map<IToDo>(getDataFromSubdirectory);
    }, ['itemDirectory']);
}