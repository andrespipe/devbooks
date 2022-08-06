import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";

class GlobalCounter {
  count: number = 0;
  increment(): void {
    this.count++;
  }
}

describe("Test setup and teardown :: GlobalCounter test", () => {
  let globalCounter: GlobalCounter;

  beforeAll(() => {
    globalCounter = new GlobalCounter();
  });

  beforeEach(() => {
    globalCounter.count = 0;
  });

  afterEach(() => {
    console.log({ globalCounter });
  });

  it("Should increment", () => {
    globalCounter.increment();
    expect(globalCounter.count).toEqual(1);
  });

  it("Should increment twice", () => {
    globalCounter.increment();
    globalCounter.increment();
    expect(globalCounter.count).toEqual(2);
  });
});
