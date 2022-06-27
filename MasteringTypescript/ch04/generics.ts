// Generic constraints

function processArray<T extends Array<string> | Array<number>>(array: T) {
  console.log(typeof array[0]);
}

const strAr: string[] = ["a", "b", "c"];
processArray(strAr);

const nbrAr: number[] = [1, 2, 3];
processArray(nbrAr);

// Wont work
// const ar = [ {}, 1, '2' ];
// processArray(ar);

// Wont work
// const ar2 = [ 1, '2' ];
// processArray(ar2);

function getProp<T, K extends keyof T>(object: T, key: K): string {
  const propValue = object[key];
  const prop = `object[${String(key)}] = ${propValue}`;
  return prop;
}

interface IUser2 {
  id: number;
  password: string;
}

const myUser: IUser2 = {
  id: 5,
  password: "123456",
};

const prop = getProp(myUser, "id");
const psw = getProp(myUser, "password");
console.log(prop, psw);

// Generic interfaces

interface IPrinter {
  print(): void;
  brand: string;
}

interface ILogInterface<T extends IPrinter> {
  logToConsole(printer: T): void;
}

class LogClass<T extends IPrinter> implements ILogInterface<T> {
  logToConsole(printer: T): void {
    console.log(printer.brand);
  }
}

// Creating objects

class Cat {
  constructor(private name: string) {}
}

class Car {
  private brand = "Ford";
}

function objectCreator<T>(arg: { new (): T }): T {
  return new arg();
}

// Wont work
//objectCreator(Cat);
objectCreator(Car);

// Partial
interface IPhone {
  brand: string;
  year: number;
}

type PartialPhone = Partial<IPhone>;

const phone: IPhone = {
  brand: "Apple",
  year: 2022,
};

const partialPhone: PartialPhone = {};

// Readonly
const readonlyPhone: Readonly<IPhone> = {
  brand: "Samsung",
  year: 2021,
};

// readonlyPhone.brand = "huawei";
phone.brand = "Sony";
partialPhone.brand = "apple";

// Pick
const brand: Pick<IPhone, "brand"> = {
  brand: "razer",
};

// Record

const newPhone: Record<"price", number> = {
  price: 300,
};

// Conditional types

type NumberOrString<T> = T extends number ? number : string;

function numberOrString<T>(item: NumberOrString<T>): void {
  console.log(typeof item);
}

numberOrString<number>(5);
numberOrString<string>(":D");
// wont work
// numberOrString<string>(true);

// Conditional type chaining
interface a {
  id: number;
}

interface b {
  name: number;
  brand: string;
}

type A_B<T> = T extends a ? a : T extends b ? [number, string] : never;

// Type infer

type MyInferedType<T> = T extends { id: infer U } ? U : never;

interface IPC {
  id: number;
}

const pcId: MyInferedType<IPC> = 5;

type inferedFromParam<T> = T extends (a: infer U) => void ? U : never;

function inferFromParam<T>(a: inferedFromParam<T>) {}

inferFromParam<(a: number) => void>(1);
inferFromParam<(a: string) => void>("str");

// Exclude
type excluded = Exclude<string | number | boolean, string | number>;

function printAny(param: excluded) {}

// printAny('asdda');
// printAny(5);
printAny(true);
