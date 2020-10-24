import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { SharedDirectory } from "@fluidframework/map";

export class Main extends DataObject {

    public static Factory = new DataObjectFactory(
        "main",
        Main,
        [
            SharedDirectory.getFactory(),
        ],
        {}
    );
    
    protected async initializeFirstTime() {
        // Set Schema
    }

    protected async hasInitialized() {
        // Get Schema
    }
}