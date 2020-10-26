# ToDo


# Framework Comments
* Boilerplate
It's weird that we emit "itemDirectory" in the dataObject, store the directory as "fluentDirectory" or what have you, and have a "useItems" fn in selectors.

It feels like these things should all be one concept? It's great that useItems returns a "real array", I sort of just want that to be the main thing... Oh. I guess I want it to be available from the view?

I initialize a schema, then get a static fn 
#### I think I moderately improved this by removing the redux-ness of this. It's also less patterned, probably a wash.

* "Fluid Component"-ization
Is moderately hard. by having the dataObject be the reactContext, you're really pushing the developer to just consider one object. Or at least a relatively flat grouping of objects.



# Gotchas
* You can't have onClick= () => ... where the ... includes React.useContext. You need to get a callback from a function that inherits the context via scope

# TODO
* Move the selectors somewhere reasonable
* Rename useDispatch

# Questions
* React.useEffect seems really expensive? Especially in the useSelector...

# Presentation
Start with View?
* Get Getters
* Get Setters