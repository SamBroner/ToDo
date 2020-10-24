import { ContainerRuntimeFactoryWithDefaultDataStore } from "@fluidframework/aqueduct";
import { Main } from "./dataObjects/main";

export const ContainerFactory = new ContainerRuntimeFactoryWithDefaultDataStore(
    Main.Factory.type,
    new Map([
        Main.Factory.registryEntry,
    ]),
);