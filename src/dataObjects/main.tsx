import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { ISharedDirectory, SharedDirectory } from "@fluidframework/map";
import {
    IFluidHandle,
} from "@fluidframework/core-interfaces";

export class TodoList extends DataObject {
    public todos!: ISharedDirectory; // Property

    public static Factory = new DataObjectFactory(
        "main",
        TodoList,
        [
            SharedDirectory.getFactory(),
        ],
        {}
    );

    protected async initializingFirstTime() {
        const todos = SharedDirectory.create(this.runtime);
        this.root.set("todoDirectory", todos.handle);
    }

    protected async hasInitialized() {
        this.todos = await this.root.get<IFluidHandle>("todoDirectory").get() as ISharedDirectory;

        // Because we're just reproccessing the whole directory every time, may as well use ops for simplicity
        this.todos.on("op", () => {
            this.emit("todoDirectory")
        })
    }

    // Public wrapper around Internal Method
    public emitEvent = (event: string) => {
        this.emit(event);
      };
}

