// This creates an IIF (Inmediate Invoke Function)

enum Directions {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

// This creates an IIF (Inmediate Invoke Function)
// String enums
enum StringDirections {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

// Constant enums (improved performance)
// Do not create IIF
const enum ConstDirections {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
}

const enum ConstDirections2 {
  UP = 0,
  DOWN = 1,
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

type Directions2Type = string | number;

const directionsMapper2: { [key: Directions2Type]: () => Directions2Type } = {
  [ConstDirections2.DOWN]: () => ConstDirections2.DOWN,
  [ConstDirections2.LEFT]: () => ConstDirections2.LEFT,
  [ConstDirections2.UP]: () => ConstDirections2.UP,
  [ConstDirections2.RIGHT]: () => ConstDirections2.RIGHT,
};

const enum ConstDirections3 {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

const directionsMapper3: { [key: string]: () => string } = {
  [ConstDirections3.DOWN]: () => ConstDirections3.DOWN,
  [ConstDirections3.LEFT]: () => ConstDirections3.LEFT,
  [ConstDirections3.UP]: () => ConstDirections3.UP,
  [ConstDirections3.RIGHT]: () => ConstDirections3.RIGHT,
};

const calc = (param: string) => console.log(param);
