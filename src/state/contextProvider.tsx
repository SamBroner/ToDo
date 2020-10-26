import * as React from "react";
import { TodoList } from "../dataObjects/TodoDataObject";

export const FluidContext = React.createContext<TodoList>({} as TodoList);
