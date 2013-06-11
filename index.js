;(function(factory){

  if (typeof define !== 'undefined' && define.amd){
    define(factory)
  }else if (typeof module !== 'undefined' && module.exports){
    factory(require, exports, module)
  }else if (typeof window !== 'undefined'){
    var mod = {exports: {}}
    factory(function(lib){
      return window[lib]
    }, mod.exports, mod)
    window.BodyDouble = mod.exports
  }

}(function(require, exports, module){



var spy = require('ispy')

function BodyDouble(obj){
  var ret = {}
  for (var prop in obj){
    if (prop.charAt(0) === '_') continue
    var value = obj[prop]
    if (typeof value === 'function'){
      ret[prop] = spy()
    }
  }
  return ret
}

module.exports = BodyDouble


}));