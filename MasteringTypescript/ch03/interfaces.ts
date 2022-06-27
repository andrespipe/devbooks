interface IUser1 {
  id: number;
  name: string;
  age?: number; // Optional
}

const user: IUser1 = {
  id: 1,
  name: "Pablo",
};

// Weak type
interface IWeakUser {
  id?: number;
  name?: string;
  age?: number;
}

// const weakUser: IWeakUser = {
//   description: 'not valid property'
// };

// In operator
interface IDisabledUser extends IUser1 {
  isDisabled: boolean;
}

validateUserProps(user);

function validateUserProps(user: IUser1 | IDisabledUser) {
  if ("id" in user) {
    console.log(`User has ID: ${user.id}`);
  }

  if ("isDisabled" in user) {
    console.log(`User is disabled: ${user.isDisabled}`);
  }
}

const disabledUser: IDisabledUser = { ...user, isDisabled: true };
validateUserProps(disabledUser);

// Keyof

type UserPropsNames = keyof IUser1; // Equivalent to type UserPropsNames = 'id' | 'name' | 'age';

function printUserProp(prop: UserPropsNames, user: IUser1): void {
  console.log(user[prop]);
}

printUserProp("name", user);
// printUserProp('x', user); // won't work; is not in the accepted values

// Classes
class Animal {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  print(): void {
    console.log(this.id);
  }
}

// Implementing interfaces

interface IPrintable {
  print(): void;
}

// Abstract classes are designed to be derived from
abstract class AbstractPrintable implements IPrintable {
  protected abstract title(): string;
  protected abstract date(): string;

  print(): void {
    console.log(`Title: ${this.title()} Date: ${this.date()}`);
  }
}

class Page implements IPrintable {
  print(): void {
    console.log("Page printed");
  }
}

class Book extends AbstractPrintable {
  private author = "Gabo"; // Typescript private
  #country: string = "Polombia"; // ES6 private

  protected title(): string {
    return "100 años de soledad";
  }

  protected date(): string {
    return "1967";
  }

  readonly genre: string = "Narrative";

  // ES5
  private _id: number = 0;
  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  // ES5 end

  // Shortcuts to modifier accessors Typescript feature
  constructor(private language: string, public pages: number) {
    super();
  }

  static isHandBook(): boolean {
    return false;
  }

  static isNew: boolean = false;
}

const book: Book = new Book("es", 471);
book.print();
book.id = 1;
Book.isHandBook();
Book.isNew;

// Namespaces
namespace PrivateBooks {
  export class Book {
    readonly type = "This is a private book";
  }
  class Page {
    readonly type = "This is a private page";
  }
}

// Multiple inheritance

// Class inheritance
// class Books extends Book, Page {} // Wont work

// Interface inheritance
interface ISuperUser {
  isSuperUse: boolean;
}

interface IUsers extends IUser1, IDisabledUser, ISuperUser {
  myUsers: IUser1[];
}

// Insteanceof
console.log(`book instanceof Book ${book instanceof Book}`); // True
console.log(
  `book instanceof AbstractPrintable ${book instanceof AbstractPrintable}`
); // True
console.log(`book instanceof Page ${book instanceof Page}`); // False

// Interface extending classes
class Camera {
  id: number = 0;

  shot(): void {
    console.log(`Capturing picture from camera ${this.id}`);
  }
}

interface Webcam extends Camera {
  setId(value: number): void;
}

class MyCamera implements Webcam {
  id!: number;

  setId(value: number): void {
    this.id = value;
  }

  shot(): void {
    console.log(`My Camera ${this.id} is printing `);
  }
}
