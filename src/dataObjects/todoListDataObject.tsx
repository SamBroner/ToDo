import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import {
    IFluidHandle,
} from "@fluidframework/core-interfaces";
import { SharedObjectSequence, SharedString } from "@fluidframework/sequence";
import { IToDo } from "../state/todoListManager";
import { IFluidHTMLView } from "@fluidframework/view-interfaces";
import React from "react";
import ReactDOM from "react-dom";
import { FluidContext } from "../state/contextProvider";
import { Stack } from "@fluentui/react";
import { ToDos } from "../components/ToDo";

export class TodoList extends DataObject implements IFluidHTMLView {
    public get IFluidHTMLView() { return this; }

    public todos!: SharedObjectSequence<IToDo>; // Property
    public todoTitle!: SharedString;

    public static Factory = new DataObjectFactory(
        "main",
        TodoList,
        [
            SharedObjectSequence.getFactory(),
            SharedString.getFactory(),
        ],
        {}
    );

    protected async initializingFirstTime() {
        const todos = SharedObjectSequence.create<any>(this.runtime);
        this.root.set("todoSequence", todos.handle);

        const todoString = SharedString.create(this.runtime);
        this.root.set("todoString", todoString.handle);
    }

    protected async hasInitialized() {
        this.todos = await this.root.get<IFluidHandle>("todoSequence").get() as SharedObjectSequence<IToDo>;

        this.todos.on("op", () => {
            this.emit("todoSequence")
        })

        this.todoTitle = await this.root.get<IFluidHandle>("todoString").get() as SharedString;
        this.todoTitle.on("op", () => {
            this.emit("todoString");
        })
    }

    // Public wrapper around Internal Method
    public emitEvent = (event: string) => {
        this.emit(event);
    };

    public render(div: HTMLElement) {
        ReactDOM.render(
            <FluidContext.Provider value={this} >
                <Stack gap={24}>
                    <ToDos />
                </Stack>
            </FluidContext.Provider >
            , div)

    }
}
