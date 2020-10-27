/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import {
    IChannelAttributes,
    IFluidDataStoreRuntime,
    IChannelServices,
} from "@fluidframework/datastore-definitions";
import { ISharedObject } from "@fluidframework/shared-object-base";
import { SharedObjectSequence, SharedObjectSequenceFactory, SubSequence } from "@fluidframework/sequence";
import { createGroupOp, createInsertSegmentOp, createRemoveRangeOp, IMergeTreeDeltaOp } from "@fluidframework/merge-tree";

/**
 * The SharedObjectSequence holds a sequence of serializable objects. Each object will be stored
 * at a position within the sequence. See the
 * {@link https://github.com/microsoft/FluidFramework/blob/main/packages/dds/sequence/README.md | sequence readme}
 * for details on working with sequences.
 */
export class SharedObjSeq<T> extends SharedObjectSequence<T> {

    public static getFactory() {
        return new SharedObjSeqFactory();
    }

    public findAndUpdateObject(findIndexPredicate: (value: T, index: number, obj: T[]) => boolean, obj: Partial<T>) {
        const items = this.getItems(0);
        const index = items.findIndex(findIndexPredicate);
        let item = items[index];
        
        for (const [key, value] of Object.entries(obj)) {
            item[key] = value;
        }

        const segment = new SubSequence([item])

        const ops: IMergeTreeDeltaOp[] = [];
        ops.push(createRemoveRangeOp(index, index + 1));
        ops.push(createInsertSegmentOp(index, segment));

        const groupOp = createGroupOp(...ops);

        this.groupOperation(groupOp);
        
    }
}

export class SharedObjSeqFactory extends SharedObjectSequenceFactory {
    public async load(
        runtime: IFluidDataStoreRuntime,
        id: string,
        services: IChannelServices,
        branchId: string,
        attributes: IChannelAttributes): Promise<ISharedObject> {
        const sharedSeq = new SharedObjSeq<object>(runtime, id, attributes);
        await sharedSeq.load(branchId, services);
        return sharedSeq;
    }

}