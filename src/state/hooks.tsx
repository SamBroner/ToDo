import { createListItems, IExampleItem } from "@uifabric/example-data";
import React from "react";
import { Main } from "../dataObjects/main";
import { FluidContext } from "./contextProvider";

export const useSelector = <T,>(selectorFunction: (dataObject: Main) => T, eventNames: string[]): T => {
    const dataObject = React.useContext(FluidContext);

    const [selectorState, setSelectorState] = React.useState<T>(
        selectorFunction(dataObject)
    );
    const updateSelectorState = () => {
        setSelectorState(selectorFunction(dataObject));
    };

    React.useEffect(() => {
        // I suspect this could be simplified?
        eventNames.forEach(name => {
            dataObject.on(name, updateSelectorState)
        });

        () => {
            eventNames.forEach(name => {
                dataObject.off(name, updateSelectorState)
            })
        }
    }, [dataObject]);

    return selectorState;
}

export const getItemSetters = () => {
    const dataObject = React.useContext(FluidContext);
    const { myDir } = dataObject;

    return {
        /**
         * Doesn't take a parameter because we use Fluent's auto generator
         */
        addItem: () => {
            // Would be params
            const {id, item} = {
                id: Date.now().toString(),
                item: createListItems(1)[0],
            }
        
            item.key = id;
            const subdir = myDir.createSubDirectory(item.key);
            for (const k in item) {
              subdir.set(k, item[k]);
            }
        },
        deleteItem: (key: string) => {
            if (myDir.hasSubDirectory(key)) {
              myDir.deleteSubDirectory(key);
              dataObject.emitEvent("itemDirectory");
            }
            return;
        },
        updateItem: (id: string, updates: Partial<Omit<IExampleItem, "id">>) => {        
            const subDir = myDir.getSubDirectory(id);
            for (const key in updates) {
              subDir?.set(key, updates[key])
            }
            return;
        }
    }
}

export const getItems = () => {
    return useSelector<IExampleItem[]>(({ myDir }) => {
        return Array.from(myDir!.subdirectories()).map<IExampleItem>(getDataFromSubdirectory);
    }, ['itemDirectory']);
};

export const getDataFromSubdirectory = <T,>(item: any): T => {
    const data = {};
    for (const [key, value] of item[1]) {
        data[key] = value;
    }
    // Watch out for this... feels like it could bite you
    data['id'] = item[0];
    return data as T;
}