import { IMergeTreeDeltaOp, createRemoveRangeOp, createInsertSegmentOp, createGroupOp } from "@fluidframework/merge-tree";
import { SubSequence } from "@fluidframework/sequence";
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

            // Create new Object? Pass in Handle?
            const todo = {
                id: Date.now().toString(),
                title,
                completed: false,
            }
            // Put at end
            todos.insert(todos.getItemCount(), [todo]);
        },
        updateTodo: (id: string, todo: Partial<IToDo>) => {
            // should be doable with replaceRange?

            const items = todos.getItems(0);
            const index = items.findIndex((item) => item.id === id);
            let item = items[index];
            
            for (const [key, value] of Object.entries(todo)) {
                item[key] = value;
            }
    
            const segment = new SubSequence([item])
    
            const ops: IMergeTreeDeltaOp[] = [];
            ops.push(createRemoveRangeOp(index, index + 1));
            ops.push(createInsertSegmentOp(index, segment));
    
            const groupOp = createGroupOp(...ops);
            todos.groupOperation(groupOp);
        },
        deleteTodo: (id: string) => {
            todos.getPosition("a");
            const index = todos.getItems(0).findIndex((item) => item.id === id)
            todos.remove(index, index + 1);
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
