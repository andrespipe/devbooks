import { describe, it, expect } from "@jest/globals";

class MyCallbackClass {
  excecuteCallBack(value: string, callBackFn: (value: string) => null) {
    console.log(`excecuteCallback invoking callbackFn`);
    callBackFn(value);
  }
}

describe("Mocked tests", () => {
  it("should mock callback function", () => {
    // const mock = jest.fn();
    // const myCallBackClassInstance = new MyCallbackClass();
    // myCallBackClassInstance.excecuteCallBack("test", mock);
    // expect(mock).toHaveBeenCalled();
    // expect(mock).toHaveBeenCalledWith("test");
  });
});
