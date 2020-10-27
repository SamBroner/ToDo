import { IMergeTreeDeltaOp, createRemoveRangeOp, createInsertSegmentOp, createGroupOp } from "@fluidframework/merge-tree";
import { SubSequence } from "@fluidframework/sequence";
import { diffStringsRaw } from "jest-diff";
import React from "react";
import { TodoList } from "../dataObjects/todoListDataObject";
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
    const { todos, todoTitle } = dataObject;

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
            const index = todos.getItems(0).findIndex((item) => item.id === id)
            todos.remove(index, index + 1);
        },
        updateTodoText: (text: string) => {
            const diffs = diffStringsRaw(todoTitle.getText(), text, true)
            let pos = 0;
            diffs.forEach((diff, i) => {
                switch (diff[0]) {
                    case 0:
                        pos += diff[1].length;
                        break;
                    case 1:
                        todoTitle.insertText(pos, diff[1])
                        pos += diff[1].length;
                        break;
                    case -1:
                        todoTitle.removeText(pos, pos + diff[1].length)
                        break;
                }
            })
            return;
        }
    }
}

// the selectorFn is responsible for getting an IToDo[] from the TodoList
// Use UseSelector is responsible for keeping that IToDo[] up to date 
// (and react then rerendering any dependent components)
export const getToDos = () => {
    return useSelector<IToDo[]>((todoList: TodoList) => {
        return todoList.todos.getItems(0);
    }, ["todoSequence"]);
}

export const getToDoString = () => {
    return useSelector<string>((todoList: TodoList) => {
        return todoList.todoTitle.getText();
    }, ['todoString']);
}