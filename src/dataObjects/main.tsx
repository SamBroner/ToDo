import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { ISharedDirectory, SharedDirectory } from "@fluidframework/map";
import { createListItems, IExampleItem } from "@uifabric/example-data";
import {
    IFluidHandle,
} from "@fluidframework/core-interfaces";

export class Main extends DataObject {
    // public items: IExampleItem[] | undefined;
    public myDir!: ISharedDirectory;
    // public get myDir(): ISharedDirectory {
    //     if (!this._myDir) throw new Error("no myDir?");
    //     return this._myDir;
    // }
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


        // Get Schema
    }

    public emitEvent = (event: string) => {
        this.emit(event);
      };
}

