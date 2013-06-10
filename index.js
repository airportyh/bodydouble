function BodyDouble(obj){
  var ret = {}
  for (var prop in obj){
    if (prop.charAt(0) === '_') continue
    var value = obj[prop]
    if (typeof value === 'function'){
      ret[prop] = ispy()
    }
  }
  return ret
}