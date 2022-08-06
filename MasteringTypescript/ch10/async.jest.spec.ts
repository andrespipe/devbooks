import { describe, fdescribe, it, expect, beforeEach } from "@jest/globals";
import * as jest from "jest";

class MockAsync {
  excecuteSlowFunction(complete: (value: string) => void) {
    setTimeout(() => {
      complete("completed");
    }, 1000);
  }
}

fdescribe("Asynch tests", () => {
  let returnedValue!: string;

  beforeEach((done) => {
    // done: jes.DoneCallback
    const mockAsync = new MockAsync();
    console.log(`1. Calling executeSlowFn`);
    const slowFn = (value: string) => {
      console.log(`2. Calling completed value: ${value}`);
      returnedValue = value;
      done();
    };

    mockAsync.excecuteSlowFunction(slowFn);
  });

  it("should return value after 1 second", () => {
    console.log(`3. Checking returned value: ${returnedValue}`);
    expect(returnedValue).toEqual("completed");
  });
});
