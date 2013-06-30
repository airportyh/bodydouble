mocha.setup('tdd')
var assert = chai.assert

var mock = BodyDouble.mock
var stub = BodyDouble.stub

test('it doubles as an object', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  var fakeBob = mock(bob)
  fakeBob.walk()
  fakeBob.walk()
})

test('its methods are spies', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  var fakeBob = mock(bob)
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
  var fakeBob = mock(bob)
  assert.deepEqual(keys(fakeBob), ['walk', 'talk'])
})


test('fluent methods', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  var fakeBob = mock(bob, {fluent: true})
  assert.equal(fakeBob.walk().talk(), fakeBob)
})


test('overrides functions', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  var calledWalk = false
  var fakeBob = mock(bob, {
    override: {
      walk: function(){
        calledWalk = true
        return 'blah'
      }
    }
  })
  assert.equal(fakeBob.walk(), 'blah')
  assert(calledWalk)
})

test('doesnt let you override methods that were not there', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  assert.throw(function(){
    var fakeBob = mock(bob, {
      override: {
        sing: function(){}
      }
    })
  }, 'Tried to override non-existing method(s): sing')
})

test('stubbing', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  stub(bob, 'walk').returns(1)
  assert.equal(bob.walk(), 1)
})

test('can also stub values', function(){
  var bob = {
    age: 10
  }
  assert.equal(stub(bob, 'age', 12), 12)
  assert.equal(bob.age, 12)
})

test('doesnt let you stub if method werent there', function(){
  var bob = {
    walk: function(){},
    talk: function(){}
  }
  assert.throw(function(){
    stub(bob, 'sing').returns(1)
  }, 'Tried to stub a non-existing method: sing')
})

test('restores stubs', function(){
  var walk = function(){}
  var bob = {
    walk: walk,
    age: 5
  }
  stub(bob, 'walk').returns(1)
  stub(bob, 'age', 9)
  BodyDouble.restoreStubs()
  assert.strictEqual(bob.walk, walk)
  assert.equal(bob.age, 5)
})

function keys(obj){
  var keys = []
  for (var prop in obj){
    keys.push(prop)
  }
  return keys
}