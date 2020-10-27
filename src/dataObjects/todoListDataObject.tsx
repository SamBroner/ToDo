import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import {
    IFluidHandle,
} from "@fluidframework/core-interfaces";
import { SharedObjectSequence } from "@fluidframework/sequence";
import { IToDo } from "../state/todoListManager";

export class TodoList extends DataObject {
    public todos!: SharedObjectSequence<IToDo>; // Property

    public static Factory = new DataObjectFactory(
        "main",
        TodoList,
        [
            SharedObjectSequence.getFactory(),
        ],
        {}
    );

    protected async initializingFirstTime() {
        const todos = SharedObjectSequence.create<any>(this.runtime);
        this.root.set("todoSequence", todos.handle);
    }

    protected async hasInitialized() {
        this.todos = await this.root.get<IFluidHandle>("todoSequence").get() as SharedObjectSequence<IToDo>;

        // Because we're just reproccessing the whole directory every time, may as well use ops for simplicity
        this.todos.on("op", () => {
            this.emit("todoSequence")
        })
    }

    // Public wrapper around Internal Method
    public emitEvent = (event: string) => {
        this.emit(event);
      };
}

