import "reflect-metadata";

function myClassDecorator(constructor: Function) {
  console.log("myClassDecorator", { constructor });
}

function myClassDecorator2(constructor: Function) {
  console.log("myClassDecorator2", { constructor });
}

function myPropertyDecorator(target: any, propertyKey: string) {
  console.log("myPropertyDecorator", {
    target,
    propertyKey,
    constructor: target.constructor,
    targetName: target?.name ?? target?.constructor?.name,
  });
}

function myStaticPropertyDecorator(target: any, propertyKey: string) {
  console.log("myStaticPropertyDecorator", {
    target,
    propertyKey,
    constructor: target.constructor,
    targetName: target?.name ?? target?.constructor?.name,
  });
}

function myMethodDecorator(
  target: any,
  methodName: string,
  descriptor?: PropertyDescriptor
) {
  console.log("myMethodDecorator", {
    target,
    methodName,
    descriptor,
    method: target[methodName],
  });
}

function myParameterDecorator(
  target: any,
  methodName: string,
  parameterIndex: number
) {
  console.log("myParameterDecorator", {
    target,
    methodName,
    parameterIndex,
  });
}

@myClassDecorator // Called only on class definition
@myClassDecorator2
// @myParameterDecorator // Won't work
class ClassWithDecorator {
  @myPropertyDecorator
  propertyWithDecorator = "propertyWithDecorator value";

  @myStaticPropertyDecorator
  staticPropertyWithDecorator = "staticPropertyWithDecorator value";

  constructor(@myParameterDecorator private name?: string) {}

  @myMethodDecorator
  myPublicMethodWithDecorator(): void {
    console.log("myPublicMethodWithDecorator");
  }

  @myMethodDecorator
  myPublicMethodWithParamsWithDecorator(
    @myParameterDecorator param: string
  ): void {
    console.log("myPublicMethodWithParamsWithDecorator", { param });
  }
}

console.log("Instances created");
const instanceA: ClassWithDecorator = new ClassWithDecorator();
const instanceB: ClassWithDecorator = new ClassWithDecorator();

console.log("Calling methods");

console.log("Calling propertyWithDecorator");
instanceA.propertyWithDecorator;
instanceA.propertyWithDecorator = "propertyWithDecorator new value";

console.log("Calling myPublicMethodWithDecorator");
instanceA.myPublicMethodWithDecorator();

console.log("myPublicMethodWithParamsWithDecorator");
instanceA.myPublicMethodWithParamsWithDecorator("param");

// Decorator factories
console.log("Decorator factories");

function decoratorFactory(name: string) {
  return (constructor: Function) => {
    console.log(`Called decorator with name = ${name}`);
    // Creating new properties on constructor
    constructor.prototype.newProperty = "new prop value";
  };
}

@decoratorFactory("ClassWithDecoratorFactory as param")
class ClassWithDecoratorFactory {}

const instanceC = new ClassWithDecoratorFactory();
console.log(`instanceC newProperty = '${(<any>instanceC).newProperty}'`);

const instanceD = new ClassWithDecoratorFactory();
console.log(`instanceD newProperty = '${(<any>instanceD).newProperty}'`);

// Method decorators override

console.log("Metod decorators override");

function logWithPrefix(prefix: string) {
  return function (
    target: any,
    methodName: string,
    descriptor?: PropertyDescriptor
  ) {
    console.log({
      target,
      methodName,
      descriptor,
      returnType: Reflect.getMetadata("design:returntype", target, methodName),
      type: Reflect.getMetadata("design:type", target, methodName),
    });
    const originalFunction = target[methodName];
    const logFunction = function (this: any) {
      console.log(`${prefix} :: Init`);
      originalFunction.apply(this, arguments);
      console.log(`${prefix} :: End`);
    };

    target[methodName] = logFunction;
    return target; // Updated class definition
  };
}

class PrinterClass {
  @logWithPrefix("Office")
  print(printer: string, pages: number, file: string): string {
    const printerResult = `printer:: ${printer}, pages:: ${pages}, file:: ${file}`;
    console.log(printerResult);
    return printerResult;
  }
}

const printerObj = new PrinterClass();
printerObj.print("CANON", 5, "./doc.pdf");
