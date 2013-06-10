mocha.setup('tdd')
var assert = chai.assert

test('it doubles as an object', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  var fakeBob = BodyDouble(bob)
  fakeBob.walk()
  fakeBob.walk()
})

test('its methods are spies', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  var fakeBob = BodyDouble(bob)
  fakeBob.walk()
  assert(fakeBob.walk.called, 'how come you dont call?')
})

test('doesnt include "private" methods or non-functions', function(){
  var bob = {
    walk: function(){},
    talk: function(){},
    _think: function(){},
    age: 15
  }
  var fakeBob = BodyDouble(bob)
  assert.deepEqual(keys(fakeBob), ['walk', 'talk'])
})

function keys(obj){
  var keys = []
  for (var prop in obj){
    keys.push(prop)
  }
  return keys
}