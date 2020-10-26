import * as React from "react";
import { TodoList } from "../dataObjects/main";

export const FluidContext = React.createContext<TodoList>({} as TodoList);
