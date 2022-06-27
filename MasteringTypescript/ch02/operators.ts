// Conditional expressions (ternary)
const isTruthyExpression = false;
const toPrint = isTruthyExpression
  ? "We will print a truthy"
  : "No truthy will be printed";
console.log({ toPrint });

// Optional chainig
interface IObjType {
  props: IObjTypeProps;
  print: () => void;
}

interface IObjTypeProps {
  id: number;
  name: string;
  date?: { y: number; m: number };
}

const myObj = <IObjType>{
  props: {
    id: 1,
    name: "AFMV",
  },
  print() {},
};

// Optional chaining with nullish coallescing
console.log(
  `Getting prop DATE: ${myObj?.props?.date?.y ?? "There is no year"}`
);

type SafeSumTypeAlias = number | null | undefined;

const safeSum = (param1: SafeSumTypeAlias, param2: SafeSumTypeAlias): number =>
  (param1 ?? 0) + (param2 ?? 0);

// Definite assignment
console.log("Definite assignment");
console.log(myVar1); // Undefined
var myVar1!: number;
myVar1 = 5;
console.log(myVar1); // 5
