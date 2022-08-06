import { describe, it, expect } from "@jest/globals";

function sum(a: number, b: number): number {
  return a + b;
}

describe("Data driven tests", () => {
  const expectations: { a: number; b: number; result: number }[] = [
    { a: 1, b: 2, result: 3 },
    { a: -5, b: 5, result: 0 },
    { a: 1, b: NaN, result: NaN },
  ];

  expectations.forEach((expectation) => {
    const { a, b, result } = expectation;
    it(`Arg a(${a}) + b(${b}) = ${result}`, () => {
      const calculated = sum(a, b);
      expect(calculated).toEqual(result);
    });
  });
});
