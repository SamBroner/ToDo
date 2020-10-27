import * as React from "react";
import { TodoList } from "../dataObjects/todoListDataObject";

export const FluidContext = React.createContext<TodoList>({} as TodoList);
