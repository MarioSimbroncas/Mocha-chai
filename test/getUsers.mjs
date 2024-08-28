import { expect, should } from 'chai';

describe("Check two numbers", () => {
  const first = 1;
  const second = 2;
  it("Check if the sum of two numbers is 3", () => {
    expect(first + second).to.equal(3);
  });
});
