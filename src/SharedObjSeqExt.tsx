/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { SharedObjectSequence, SubSequence } from "@fluidframework/sequence";

/**
 * The SharedObjectSequence holds a sequence of serializable objects. Each object will be stored
 * at a position within the sequence. See the
 * {@link https://github.com/microsoft/FluidFramework/blob/main/packages/dds/sequence/README.md | sequence readme}
 * for details on working with sequences.
 */
export class SharedObjSeq<T> extends SharedObjectSequence<T> {

    public replace(start: number, end: number, items: T[]) {
        const segment = new SubSequence<T>(items);

        this.replaceRange(start, end, segment)
    }

    public findFirstSegment(selector: (item: T) => boolean) {
        const items = this.getItems(0);
    }
}
