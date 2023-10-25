/**
 * Walk the input `node` and statically evaluate it.
 *
 * Returns an object in the form `{ confident, value, deopt }`. `confident`
 * indicates whether or not we had to drop out of evaluating the expression
 * because of hitting an unknown node that we couldn't confidently find the
 * value of, in which case `deopt` is the path of said node.
 *
 * Example:
 *
 *   t.evaluate(parse("5 + 5")) // { confident: true, value: 10 }
 *   t.evaluate(parse("!true")) // { confident: true, value: false }
 *   t.evaluate(parse("foo + foo")) // { confident: false, value: undefined, deopt: NodePath }
 *
 */

export function evaluate(this: NodePath): {
    confident: boolean;
    value: any;
    deopt?: NodePath;
  } 
  {
    const state: State = {
      confident: true,
      deoptPath: null,
      seen: new Map(),
    };
    let value = evaluateCached(this, state);
    if (!state.confident) value = undefined;
  
    return {
      confident: state.confident,
      deopt: state.deoptPath,
      value: value,
    };
  }
  type State = {0
  }
  if (
    object.isIdentifier() &&
    property.isIdentifier() &&
    isValidObjectCallee(object.node.name) &&
    !isInvalidMethod(property.node.name)
  ) {
    context = global[object.node.name];
    
    func = context[property.node.name];
  }
  

  if (func) {
    const args = path.get("arguments").map((arg) => evaluateCached(arg, state));
    if (!state.confident) return;
  
    return func.apply(context, args);
  }