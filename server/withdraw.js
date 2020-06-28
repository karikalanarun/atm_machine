const R = require("ramda");

const { ifElse } = require("crocks/logic");

// note :: number
// MinNotes:: {amount: number, min_notes: { note: number} }

const availableNotes = [2000, 500, 200, 100, 50, 20, 10];

// isAmountIsGreterThanNote :: MinNotes -> note -> bool
const isAmountIsGreterThanNote = R.curry((minNotes, note) =>
  R.compose(R.lte(note), R.prop("amount"))(minNotes));

// remainingAmount :: number -> number -> number -> number
const remainingAmount = R.curry((amount, note, numberOfNote) =>
  R.compose(R.subtract(amount), R.multiply(note))(numberOfNote)
);

// noOfNotes :: number -> note -> number
const noOfNotes = R.divide;

// addNoteToResult :: note -> number -> MinNotes -> MinNotes
const addNoteToResult = R.curry((note, noOfNote, minNotes) =>
  R.assocPath(["min_notes", note], noOfNote, minNotes)
);

// updateRemainingAmount ::  number -> MinNotes -> MinNotes
const updateRemainingAmount = R.curry((amount, minNotes) =>
  R.assoc("amount", amount, minNotes)
);

// updateResult :: MinNotes -> note -> number -> number -> MinNotes
const updateResult = R.curry((minNotes, note, noOfNotes, amount) =>
  R.compose(
    addNoteToResult(note, noOfNotes),
    updateRemainingAmount(amount)
  )(minNotes)
);

// minusAmount :: MinNotes -> note -> MinNotes
const minusAmount = R.curry((minNotes, note) => {
  const amount = R.prop("amount", minNotes);
  const numberOfNotes = Math.floor(noOfNotes(amount, note));
  const remAmount = remainingAmount(amount, note, numberOfNotes);
  return updateResult(minNotes, note, numberOfNotes, remAmount);
});

// takeNote :: MinNotes -> note -> MinNotes
const takeNote = R.curry((minNotes, note) => {
  return ifElse(
    isAmountIsGreterThanNote(minNotes),
    (note) => minusAmount(minNotes, note),
    R.always(minNotes)
  )(note)
}
);

// withdraw :: number -> {number: number}
const withdraw = (amount) =>
  R.compose(R.prop("min_notes"), R.reduce(takeNote, { amount, min_notes: {} }))(availableNotes);

module.exports = withdraw;
