# objnav
create fast getters and setters for deep obj traversal.

objnav creates, compiles and caches appropiate getter/setter functions by using 'Function'

# examples

```js

var objnav = require('objnav');

var obj={
  a:[0,{b:42}]
};

var N = objnav(['a',1,'b']); 

N.get(obj); // returns 42 
N.set(obj,5); // returns 5; N.get(obj) == 5

//lazy getter/setter

N(obj); // returns 5;
N(obj,6); returns 6; T.get(obj) is now 6

// more functions:
N.unset(obj) // unsets obj['a'][1]['b']

// secure[exception safe] operations
N.sGet(obj,42) // returns N.get(obj) when no error occurs otherwise 42; 
N.sSet(obj,42) // returns value which has been set otherwise null is returned
N.sUnset(obj)  // returns 1 if unset was successfull otherwise 0

//traversal

N.chain([1]).get(obj); // accesses obj['a'][1]['b'][1]  
N.parent().get(obj); // accesses obj['a'][1];


// templates :

var N2 = objnav(['a','$x','$y']); // threads $<str> as placeholder

N2.bind({x:1,y:'b'})(obj); // works the same way with get/set/ etc...


// cache

N.cache // raw access
N.clearCache() // self explanatory 


```
