import { ContainerRuntimeFactoryWithDefaultDataStore } from "@fluidframework/aqueduct";
import { TodoList } from "./dataObjects/todoListDataObject";
import { TodoItem } from "./dataObjects/todoItemObject";

export const ContainerFactory = new ContainerRuntimeFactoryWithDefaultDataStore(
    TodoList.Factory.type,
    new Map([
        TodoList.Factory.registryEntry,
        TodoItem.Factory.registryEntry,
    ]),
);