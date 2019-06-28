const toNull = () => null
const identity = value => value
const exists = value => value !== undefined || values !== null

const isObject = (val) => {
  return typeof val === 'object'
    && exists(val)
    && !Array.isArray(val)
    && !(val instanceof RegExp)
    && !(val instanceof String)
    && !(val instanceof Number)
}

const toContext = (source, target, toVal, toKey) => {
  return {
    functions: {
      toKey,
      toVal
    },
    collections: {
      source: source,
      target: target
    }
  }
}

const traverse = (context) => {
  const { toKey, toVal } = context.functions
  const { source, target } = context.collections

  for (const property in source) {
    const value = source[property]

    if (isObject(value)) {
      context.collections.source = value
      context.collections.target = {}
      target[toKey(property)] = traverse(context)
    } else {
      target[toKey(property)] = toVal(value)
    }
  }

  return target
}

const shuck = (source, target = {}, toVal = toNull, toKey = identity) => {
  const context = toContext(source, target, toVal, toKey)
  return traverse(context)
}

export default shuck
export { shuck }
