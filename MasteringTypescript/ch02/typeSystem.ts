// Any
let item1 = { id: 1, name: "Item 1" };
// item1 = { id: 2 }; // This wont work

let item2: any = { id: 3, name: "Item 2" };
item2 = { id: 4 };

// Simply Find an Interface for Any Type
// SFIAT => SVET => SWEAT

// Explicit Casting
let item3 = <any>{ id: 3, name: "Item 3" };
item3 = { id: 4 };

let item4 = { id: 4, name: "Item 4" } as any;
item4 = { id: 5 };

// Type alias =  Union types
type PrintParams = string | number;

function printArgs(arg1: PrintParams, arg2: PrintParams): void {
  if (typeof arg1 === "number" && typeof arg2 === "number") {
    const result = arg1 + arg2;
    console.log({ result });
    return;
  }

  console.log(`${arg1}${arg2}`);
}

// Objects
let newObj: object = {
  name: "newObj",
  properties: {
    id: 1,
    type: "obj",
  },
};

const printObj = (obj: object): void => {
  console.log(`obj: ${JSON.stringify(obj)}`);
};

printObj(newObj);

// Unknown
let uVar: unknown = ":D";
uVar = 2;

let nvar: number;
nvar = <number>uVar; // We require explicit casting
nvar = uVar as number; // We require explicit casting

let aVar: any = ":D";
aVar = 3;
nvar = aVar; // With any type we wont require the casting

// Never
const enum Step {
  FIRST,
  SECOND,
}

const getStepValue = (step: Step): string => {
  switch (step) {
    case Step.FIRST:
      return "First step";
    case Step.SECOND:
      return "Second step";
  }
  const returnValue: never = step;
  return returnValue;
};

// Spread precedence

const spObj1 = { id: 1, name: "spObj1" };
const spObj2 = { id: 2, props: "no props" };
const spObj3 = { ...spObj1, ...spObj2 };
// Spread Precendence { spObj3: { id: 2, name: 'spObj1', props: 'no props' } }
console.log("Spread Precendence", { spObj3 });

// Tuples
let tuple1: [string, boolean];
// tuple = ['test'];
tuple1 = ["test", true];

// Tuple with optional elements
let tuple2: [string, boolean, number?];
tuple2 = ["test", true];
tuple2 = ["test", true, 6];

// Rest params
type ArgsTypeAlias = string | number;

// Wont work with arrow function
function testArgs(...args: ArgsTypeAlias[]) {
  console.log("Rest params", args.join());
}

testArgs(1, 2, 3, 4, "5", ":D");

// Function signature
interface IObjectWithSignature {
  id: string;
  callback: (...args: number[]) => Promise<number>;
}

const objWithSignature: IObjectWithSignature = {
  id: "0001",
  callback: (...args: number[]): Promise<number> => {
    return new Promise((resolve, reject) => {
      const result = args.reduce((pre, cur) => pre + cur);
      resolve(result);
    });
  },
};

// Function override
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: boolean): string;
function add(a: any, b: any): any {
  const result = a + b;
  console.log("Function Override", { result });
  return result;
}

add(5, 3); // 8
add(":D", ":P"); // :D:P
add(":D", true); // :Dtrue
// add(true, false); // Wont work any is used only for function definition

// Literals
const enum ControlDirections {
  UP,
  DOWN,
  LEFT = 5,
  RIGHT = "RIGHT",
}

type xboxButtons = "A" | "B" | "X" | "Y" | ControlDirections;

const xboxControlInstruction = (button: xboxButtons) => {
  console.log("Literals", { button });
};

xboxControlInstruction("A");
// xboxControlInstruction('C'); // Wont work
xboxControlInstruction(0); // Like ControlDirections.UP
xboxControlInstruction(1); // Like ControlDirections.DOWN
xboxControlInstruction(5); // Like ControlDirections.DOWN
// xboxControlInstruction("RIGHT"); // Wont work
xboxControlInstruction(ControlDirections.RIGHT);
xboxControlInstruction("Y");
