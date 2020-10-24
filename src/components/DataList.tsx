

export const DataList = () => {
    const items = useItems();
    const dispatch = useDispatch();

    const onRenderCell = (item?: IExampleItem) => {
        if (!item) {
            console.log("No Item. Bad!");
            return;
        }

        const dropdownProps: IDropdownProps = {
            styles: { root: { display: "inline-block", minWidth: 300 } },
            options: [
                { key: "Los Angeles", text: "Los Angele"}
            ]
        }
    }
}