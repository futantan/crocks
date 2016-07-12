const isFunction = require('../internal/isFunction')
const isType    = require('../internal/isType')

function Identity(x) {
  if(!arguments.length) {
    throw new TypeError('Identity must wrap something')
  }

  const value = () => x
  const type  = () => 'Identity'
  const of    = Identity.of

  function equals(m) {
    return isFunction(m.type)
      && type() === m.type()
      && x === m.value()
  }

  function map(fn) {
    if(!isFunction(fn)) {
      throw new TypeError('Identity.map must be passed a function')
    }

    return Identity(fn(x))
  }

  function ap(m) {
    if(!isFunction(x)) {
      throw new TypeError('Wrapped value must be a function for ap')
    }

    if(!isType(type(), m)) {
      throw new TypeError('Both containers need to be the same for ap')
    }
    return m.map(x)
  }

  return { value, type, equals, map, ap, of }
}

Identity.of = x => Identity(x)

module.exports = Identity
