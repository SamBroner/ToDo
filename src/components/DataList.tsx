import * as React from "react";
import {
  List,
  Dropdown,
  IDropdownProps,
  IDropdownOption,
  Slider,
  IconButton,
} from "@fluentui/react";
import { IExampleItem } from "@uifabric/example-data";
import { getItems, getItemSetters } from "../state/hooks";

export const DataList = () => {

  const items = getItems();
  const {addItem, deleteItem, updateItem } = getItemSetters();

  const onRenderCell = (item?: IExampleItem) => {
    if (!item) {
      console.log("something bad happened");
      return;
    }

    const dropdownProps: IDropdownProps = {
      styles: { root: { display: "inline-block", minWidth: 300 } },
      options: [
        { key: "Los Angeles", text: "Los Angeles" },
        { key: "New York", text: "New York" },
        { key: "Portland", text: "Portland" },
        { key: "Seattle", text: "Seattle" },
        { key: "Chicago", text: "Chicago" },
      ],
      selectedKey: item.location,
      onChange: (
        event: React.FormEvent<HTMLDivElement>,
        option: IDropdownOption | undefined
      ): void => {
        if (option?.key !== undefined) {
          updateItem(item.key, { 'location': option.key.toString() });
        }
      },
    };

    if (!item) {
      return null;
    }
    return (
      <div style={{ display: "flex" }}>
        <Dropdown {...dropdownProps} />
        <Slider
          styles={{ root: { flexGrow: 1 } }}
          value={item.height}
          min={100}
          max={300}
          onChanged={(e, value) => updateItem(item.key, { 'height': value })}
        />
        <IconButton
          onClick={() => deleteItem(item.key)}
          iconProps={{ iconName: "Delete" }}
        />
      </div>
    );
  };

  return (
    <div className="DataList">
      {items.length > 0 ? (
        <List items={items} onRenderCell={onRenderCell} />
      ) : (
          <></>
        )}
      <IconButton
        onClick={() => addItem()}
        iconProps={{ iconName: "Add" }}
      />
    </div>
  )
}