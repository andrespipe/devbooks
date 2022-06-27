function add(a: number, b: number): number {
  return a + b;
}

const subs = (a: number, b: number): number => {
  return a - b;
};

export default function divide(a: number, b: number): number {
  return a / b;
}

const multiply = (a: number, b: number): number => {
  return a * b;
};

// export default multiply;

export class Utils {
  add = add;
  subs = subs;
  divide = divide;
  multiply = multiply;
}

export const mathUtils = {
  add: add,
  subs: subs,
  divide: divide,
  multiply: multiply,
};
