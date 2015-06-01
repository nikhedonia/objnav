'use strict';

var extend = function(a,b){
  for(var k in b){
    a[k]=b[k];
  }
  return a;
}

function objnavFromArray(A){
  if(!A.length) return ''; 
  var pp = '$';
  return '['+A.map(function(a){
    if( !a.toString().indexOf(pp) )
      return 'this'+"['"+a.substr(1)+"']";
    return "'"+a+"'";
  }).join('][')+']';    
}

function makeGetter(str){
  return new Function('o','return o'+str);
}

function makeSetter(str){
  return new Function('o','v','return o'+str+'='+'v');
}

function makeSaveGetter(str){
  return new Function('o','val','try{return o'+str+'}catch(e){return val}');
}

function makeSaveSetter(str){
  return new Function('o','val','try{return o'+str+'=val}catch(e){return e}');
}


function makeUnsetter(str){
  return new Function('o','delete o'+str);
}

function makeSaveUnsetter(str){
  return new Function('o','try{  delete o'+str+';return 1;}catch(e){ return null; }' );
}


var cache={};
function objnav(path){
  path=path||[];
  var p = path.join('/');
  if(cache[p]){
    return cache[p];
  }else{
    var exprStr = objnavFromArray(path);
    var chain = function(next){ return objnav(path.concat(next)); };
    var parent = function(){ return objnav(path.slice(0,-1)); };
    var obj={
      id:p,
      path:path,
      exprStr:exprStr,
      get:makeGetter(exprStr),
      set:makeSetter(exprStr),
      chain:chain,
      isRoot:!path.length,
      parent:parent,
      sGet:makeSaveGetter(exprStr),
      sSet:makeSaveSetter(exprStr),
      sUnset:makeSaveUnsetter(exprStr)
    };

    obj.getSet=function(a,b){
      if(b!==undefined){
        return obj.set.bind(this,a,b)();
      }else{
        return obj.get.bind(this,a)();
      }
    };

    return cache[p] = extend(obj.getSet,obj);
  }


}

objnav.cache=cache;
objnav.clearCache=function(){ cache={}; };
objnav.fromStr= function(str,delim){
  return objnav(str.split(delim||'/'));
};

module.exports = objnav;
