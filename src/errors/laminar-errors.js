export class LaminarError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class DirectiveError extends LaminarError {}
export class FunctionError extends LaminarError {}

export class flowGeneratorFnError extends LaminarError {
  constructor(message, { id, step }) {
    super();
    this.message = message;
    this.flow = id;
    this.step = step;
  }
}

export class CreateFlowError extends LaminarError {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class MissingCallerError extends flowGeneratorFnError {
  constructor({ id, step }) {
    console.error(`MissingCallerError - flow: ${ id }, step: ${ step + 1 } (index: ${ step })`);
    super(`A step must contain either a "call" property referencing a single function to be called, or a "calls" property referencing an array of functions to be called asynchronously.`, { flow: id, step });
  }
}

export class MissingFlowError extends flowGeneratorFnError {
  constructor(message) {
    super(message);
  }
}

// Default property guards.

export function throwMissingFlowError() {
  throw new MissingFlowError('Missing flow from flow.pushFlow({ flow: Function })');
}

export function throwMissingCallerError({ id, step }) {
  throw new MissingCallerError({ id, step });
}