import { ContainerRuntimeFactoryWithDefaultDataStore } from "@fluidframework/aqueduct";
import { TodoList } from "./dataObjects/main";

export const ContainerFactory = new ContainerRuntimeFactoryWithDefaultDataStore(
    TodoList.Factory.type,
    new Map([
        TodoList.Factory.registryEntry,
    ]),
);