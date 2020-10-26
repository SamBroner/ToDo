# ToDo
A playground for integrating some framework-style state management semantics into a todo app.

Generally targeting the functionality of todomvc.

# Framework Comments
##  Boilerplate

(I'm sort of commenting on Redux generally... :( ))

It's weird that we emit "itemDirectory" in the dataObject, store the directory as "fluentDirectory" or what have you, and have a "useItems" fn in selectors.

It feels like these things should all be one concept? It's great that useItems returns a "real array", I sort of just want that to be the main thing... Oh. I guess I want it to be available from the view?

I initialize a schema, then get a static fn 

**I think I moderately improved this by removing the redux-ness of this. It's also less patterned, probably a wash.** 

## "Fluid Component"-ization

Is moderately hard. by having the dataObject be the reactContext, you're really pushing the developer to just consider one object. Or at least a relatively flat grouping of objects.

## ToDo DataObject

I think something interesting would happen if you have a dataobject per todo... then a list of handles as the todo list?

You'd be forced to consider the overall todo list

## Rules of Hooks - "don't use hooks within loops"
This is tricky if you want to set the state for one item in a list... a fairly common scenario for fluid

We'll have to componentize the next layer

# Gotchas
* You can't have onClick= () => ... where the ... includes React.useContext. You need to get a callback from a function that inherits the context via scope [[See Rules of Hooks]]
* Directory deletes don't emit valueChanged
* getDataFromSubdirectory is just returning all of the children from subdir, so the typing is particularly weak

# TODO
* Reset ToDo input to empty after enter
* TODO "editing" is broken
* Reordering is actually fairly far off. I'd have to delete and readd the directories? Or leave a ton of tombstones. Nothing pretty

# Questions
* React.useEffect seems really expensive? Especially in the useSelector... I'm rebuilding the entire dir each time?
* I actually don't have a great understanding of the directory object... but I should.
    * Each ToDo is getting its own directory. That's somewhat interesting.
* The SharedDirectory order is a weak guarantee: the Map is based on insert order which would be different on two different machines

# Style Guidelines
* Could I move the StateManagement into the data object?
* I could move state/hooks into some sort of aqueduct layer?