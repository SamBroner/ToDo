import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { SharedString } from "@fluidframework/sequence";

export class TodoItem extends DataObject {
    public title!: SharedString;

    public static Factory = new DataObjectFactory(
        "ToDo",
        TodoItem,
        [
            SharedString.getFactory(),
        ],
        {}
    );

    protected async initializingFirstTime() {
        const title = SharedString.create(this.runtime);
        title.insertText(0, "Starting Text");
        this.root.set("title", title.handle);

        // I was going to set an ID, but I don't need one because the handle is unique
        // I guess a timestamp could be interesting?
    }

    protected async hasInitialized() {
        this.title = await this.root.get("title").get();
        this.title.on("op", () => {
            this.emit("todoTitle");
        })
    }

    // Public wrapper around Internal Method
    public emitEvent = (event: string) => {
        this.emit(event);
      };
}

