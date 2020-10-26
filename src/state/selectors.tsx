import { useSelector } from "./hooks";
import { IExampleItem } from "@uifabric/example-data";

export const useItems = () => {
    return useSelector<IExampleItem[]>(({ myDir }) => {
        return Array.from(myDir!.subdirectories()).map(getDataFromSubdirectory);
    }, ['directoryChanged']);
};

const getDataFromSubdirectory = (item: any): IExampleItem => {
    const data = {};
    for (const [key, value] of item[1]) {
        data[key] = value;
    }
    data['id'] = item[0];
    return data as IExampleItem;
}