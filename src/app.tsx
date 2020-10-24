/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as  React from "react";
import * as ReactDOM from "react-dom";
import { getDefaultObjectFromContainer } from "@fluidframework/aqueduct";
import { getTinyliciousContainer } from "@fluidframework/get-tinylicious-container";
// import { View } from "./view";
import { ContainerFactory } from "./container";
import { Main } from "./dataObjects/main";

// import { FluidContext } from "./fludux/contextProvider";

let createNew = false;
if (location.hash.length === 0) {
    createNew = true;
    location.hash = Date.now().toString();
}
const documentId = location.hash.substring(1);
document.title = documentId;

async function start(): Promise<void> {

    const container = await getTinyliciousContainer(documentId, ContainerFactory, createNew);

    const Main = await getDefaultObjectFromContainer<Main>(container);
    console.log(Main);

    const div = document.getElementById("content") as HTMLDivElement;

    ReactDOM.render(
        <div>hello world</div>
        // <FluidContext.Provider value={Main} >
        //     <View />
        // </FluidContext.Provider >
        , div)


    // Reload the page on any further hash changes, e.g. in case you want to paste in a different document ID.
    window.addEventListener("hashchange", () => {
        location.reload();
    });
}

start().catch((error) => console.error(error));
