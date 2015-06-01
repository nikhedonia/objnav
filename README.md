# objPath
create fast getters and setters for deep obj traversal


# examples

```js

var objPath = require('objPath');

var obj={
  a:[0,{b:42}]
};

var OP = objPath(['a',1,'b']); //OP

T.get(obj); // returns 42 
T.set(obj,5); // returns 5; T.get(obj) == 5

//lazy getter/setter

T(obj); // returns 5;
T(obj,6); returns 6; T.get(obj) is now 6

// more functions:
T.unset(obj) // unsets obj['a'][1]['b']

T.sGet(obj,42) // returns  T.get(obj) when no error occurs otherwise 42; 
T.sSet(obj,42) // returns value which has been set otherwise the exception object
T.sUnset(obj)  // returns 1 if unset was successfull otherwise 0

//traversal

T.chain([1]).get(obj); // accesses obj['a'][1]['b'][1]  
T.parent().get(obj); // accesses obj['a'][1];


// templates :

var T2 = objPath(['a','$x','$y']); // threads $<str> as placeholder

T2.bind({x:1,y:'b'})(obj); // works the same way with get/set/ etc...

```
