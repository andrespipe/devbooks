import { expect, test, describe, fit, xit, it } from "@jest/globals";

function throwsError() {
  throw new Error("My new error");
}

describe("Grouping tests", () => {
  test("First test", () => {
    expect(":D").toBe(":D");
  });

  test("Second test", () => {
    expect(":O").toBe(":O");
  });

  // Only this test
  // test.only("Third test", () => {
  //   expect(":)").toBe(":)");
  // });

  // Same as test.only
  // fit("Fourth test", () => {
  //   expect(";)").not.toEqual(";D");
  // });

  // Same as test.only
  // xit("Fifth test", () => {
  //   expect(";)").toEqual(";D");
  // });

  it("Should match object", () => {
    const objA = { id: 1 };
    const objB = { id: 1 };

    expect(objA).toStrictEqual(objB);
    expect(objA).toEqual(objB);
  });

  it("Should contain a value", () => {
    expect("abcdef").toContain("def");
  });

  it("Should not contain a value", () => {
    expect("abcdef").not.toContain("efg");
  });

  it("Should contain an array item", () => {
    const ar = [{ id: 1 }, { id: 2 }];

    expect(ar).toContainEqual({ id: 2 });
  });

  it("Should throw an error", () => {
    expect(() => throwsError()).toThrowError();
    expect(() => throwsError()).toThrowError(new Error("My new error"));
  });
});
