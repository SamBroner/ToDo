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