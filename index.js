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

function BodyDouble(obj, opts){
  opts = opts || {}
  var overrides = opts.override || {}
  var ret = {}
  for (var prop in obj){
    if (prop.charAt(0) === '_') continue
    var value = obj[prop]
    if (typeof value === 'function'){
      var sp = ret[prop] = spy()
      if (opts.fluent){
        sp.returns(ret)
      }
      if (overrides[prop]){
        sp.delegatesTo(overrides[prop])
        delete overrides[prop]
      }
    }
  }
  var overrideKeys = keys(overrides)
  if (overrideKeys.length > 0){
    throw new Error('Tried to override non-existing method(s): ' + 
      overrideKeys.join(', '))
  }
  return ret
}

function keys(obj){
  if (Object.keys) return Object.keys(obj)
  var ret = []
  for (var key in obj) ret.push(key)
  return ret

}

module.exports = BodyDouble


}));