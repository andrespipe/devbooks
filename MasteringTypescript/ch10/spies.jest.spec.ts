import { describe, it, expect } from "@jest/globals";

class MyMockedClass {
  functionToBeMocked(): number {
    return 5;
  }
}

describe("Spies", () => {
  // it("should resturn value from mocked", () => {
  //   const myMockedClass = new MyMockedClass();
  //   jest
  //     .spyOn(myMockedClass, "functionToBeMocked")
  //     .mockImplementation((): number => {
  //       return 10;
  //     });
  //   expect(myMockedClass.functionToBeMocked()).toEqual(10);
  // });
});
