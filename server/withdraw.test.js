const withdraw = require("./withdraw");

describe("withdraw", () => {
  test("it should return minimum notes to withdraw a amount", () => {
    // arrange
    const amount = 2560;
    const expectedNotes = { 2000: 1, 500: 1, 50: 1, 10: 1 };
    // act
    const actualNotes = withdraw(amount);
    // assert
    expect(actualNotes).toMatchObject(expectedNotes);
  });
});
