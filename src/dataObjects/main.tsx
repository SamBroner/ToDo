import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { IDirectoryValueChanged, ISharedDirectory, SharedDirectory } from "@fluidframework/map";
import { createListItems, IExampleItem } from "@uifabric/example-data";
import {
    IFluidHandle,
} from "@fluidframework/core-interfaces";

export class Main extends DataObject {
    // public items: IExampleItem[] | undefined;
    public myDir!: ISharedDirectory;
    public todos!: ISharedDirectory;

    public static Factory = new DataObjectFactory(
        "main",
        Main,
        [
            SharedDirectory.getFactory(),
        ],
        {}
    );

    protected async initializingFirstTime() {
        // Shared Directory
        const directory = SharedDirectory.create(this.runtime);
        createListItems(20).forEach((v: IExampleItem) => {
            const subdir = directory.createSubDirectory(v.key);
            for (const k in v) {
                subdir.set(k, v[k]);
            }
        });
        this.root.set("fluentDirectory", directory.handle);

        const todos = SharedDirectory.create(this.runtime);
        this.root.set("todoDirectory", todos.handle);
    }

    protected async hasInitialized() {
        this.myDir = await this.root.get<IFluidHandle>("fluentDirectory").get() as ISharedDirectory;
        this.myDir?.on("valueChanged", () => {
            this.emit("itemDirectory");
        });

        this.todos = await this.root.get<IFluidHandle>("todoDirectory").get() as ISharedDirectory;

        // Because we're just reproccessing the whole directory every time, may as well use ops for simplicity
        this.todos.on("op", () => {
            this.emit("todoDirectory")
        })

        // Get Schema
    }

    public emitEvent = (event: string) => {
        this.emit(event);
      };
}

