'use strict';

var extend = function(a,b){
  for(var k in b){
    a[k]=b[k];
  }
  return a;
}

function objPathFromArray(A){
  if(!A.length) return ''; 
  var pp = '$';
  return '['+A.map(function(a){
    if( !a.indexOf(pp) )
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
  return new Function('o','try{  delete o'+str+';return 1;}catch(e){ return e; }' );
}


var cache={};
function objPath(path){
  var p = path.join('/');
  if(cache[p]){
    return cache[p];
  }else{
    var exprStr = objPathFromArray(path);

    var obj={
      path:p,
      exprStr:exprStr,
      get:makeGetter(exprStr),
      set:makeSetter(exprStr),
      save:{
        get:makeSaveGetter(exprStr),
        set:makeSaveSetter(exprStr),
        unset:makeSaveUnsetter(exprStr)
      }
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

objPath.cache=cache;
objPath.clearCache=function(){ cache={}; };
objPath.fromStr= function(str,delim){
  return objPath(str.split(delim||'/'));
};

module.exports =objPath;
