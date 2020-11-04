/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import axios from "axios";
import { RouterliciousDocumentServiceFactory } from "@fluidframework/routerlicious-driver";
import { IRuntimeFactory } from "@fluidframework/container-definitions";
import { IUrlResolver, IFluidResolvedUrl, IResolvedUrl } from "@fluidframework/driver-definitions";
import { IRequest } from "@fluidframework/core-interfaces";
import { getContainer } from "@fluidframework/get-tinylicious-container";

class RouterliciousUrlResolver implements IUrlResolver {
    constructor(private readonly token: string, private readonly tenant: string) {
    }

    public async resolve(request: IRequest): Promise<IFluidResolvedUrl> {
        const documentId = request.url.split("/")[0];
        const documentUrl = `${process.env.ORDERER}/${this.tenant}/${request.url}`;

        return Promise.resolve({
            endpoints: {
                deltaStorageUrl: `${process.env.ORDERER}/deltas/${this.tenant}/${documentId}`,
                ordererUrl: `${process.env.ORDERER}`,
                storageUrl: `${process.env.STORAGE}/repos/${this.tenant}`,
            },
            tokens: { jwt: this.token },
            type: "fluid",
            url: documentUrl,
        });
    }
    public async getAbsoluteUrl(resolvedUrl: IResolvedUrl, relativeUrl: string): Promise<string> {
        if (resolvedUrl.type !== "fluid") {
            throw Error("Invalid Resolved Url");
        }
        const url = new URL(resolvedUrl.url);
        const documentId = url.pathname.split("/")[2];
        return `${documentId}/${relativeUrl}`;
    }
}

export async function getFRSContainer(
    documentId: string,
    containerRuntimeFactory: IRuntimeFactory,
    createNew: boolean,
) {
    if (process.env.TOKENSERVER === undefined) throw Error("Define TOKENSERVER in .env file");
    if (process.env.ORDERER === undefined) throw Error("Define ORDERER in .env file");
    if (process.env.STORAGE === undefined) throw Error("Define STORAGE in .env file");

    const documentServiceFactory = new RouterliciousDocumentServiceFactory();

    const { hostToken, tenantId } = await getFRSTokenAndTenantID(documentId, process.env.TOKENSERVER);
    const urlResolver = new RouterliciousUrlResolver(hostToken, tenantId);

    return getContainer(
        documentId,
        createNew,
        { url: documentId },
        urlResolver,
        documentServiceFactory,
        containerRuntimeFactory,
    );
}

export function hasFRSEndpoints() {
    try {
        if (process.env.TOKENSERVER === undefined) throw Error("Define TOKENSERVER in .env file");
        if (process.env.ORDERER === undefined) throw Error("Define ORDERER in .env file");
        if (process.env.STORAGE === undefined) throw Error("Define STORAGE in .env file");
    } catch {
        return false;
    }
    return true;
}

async function getFRSTokenAndTenantID(documentId: string, tokenServer: string) {
    const user = {
        id: "unique-id",
        name: "Unique Idee",
    };

    const options = {
        params: { documentId, user: JSON.stringify(user) },
    };
    const response = await axios.get(tokenServer, options);
    const hostToken = response.data.token;
    const tenantId = response.data.tenantId;

    return {
        hostToken,
        tenantId,
    };
}