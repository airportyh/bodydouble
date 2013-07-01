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

var BodyDouble = {}

BodyDouble.mock = mock
function mock(obj, opts){
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

BodyDouble.stubs = []
BodyDouble.stub = function(obj, method){
  BodyDouble.stubs.push({obj: obj, method: method, original: obj[method]})
  if (arguments.length === 2){
    if (typeof obj[method] !== 'function'){
      throw new Error('Tried to stub a non-existing method: ' + method)
    }
    return obj[method] = spy()
  }else if (arguments.length === 3){
    if (!(method in obj)){
      throw new Error('Tried to stub a non-existing property: ' + method)
    }
    return obj[method] = arguments[2]
  }
}

BodyDouble.restoreStubs = function(){
  for (var i = 0; i < BodyDouble.stubs.length; i++){
    var stub = BodyDouble.stubs[i]
    stub.obj[stub.method] = stub.original
  }
  BodyDouble.stubs = []
}

function keys(obj){
  if (Object.keys) return Object.keys(obj)
  var ret = []
  for (var key in obj) ret.push(key)
  return ret

}

module.exports = BodyDouble


}));