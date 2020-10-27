import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import {
    IFluidHandle,
} from "@fluidframework/core-interfaces";
import { SharedObjectSequence, SharedString } from "@fluidframework/sequence";
import { IToDo } from "../state/todoListManager";

export class TodoList extends DataObject {
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

        // Because we're just reproccessing the whole directory every time, may as well use ops for simplicity
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
}

