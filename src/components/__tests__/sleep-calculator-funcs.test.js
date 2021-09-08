import {calculateSleepScore, getScoreColor, getTimes} from "../sleep-calculator-funcs";

test("that calculateSleepScore works given valid inputs", () => {
  expect(calculateSleepScore(7, 7)).toEqual(100); //inBed = asleep
  expect(calculateSleepScore(7, 0)).toEqual(0); //no time asleep, time in bed
  expect(calculateSleepScore(0, 0)).toEqual(0); //no time in bed no time asleep
  expect(calculateSleepScore(5, 3)).toEqual(60); //asleep != inBed
  expect(calculateSleepScore(7, 3)).toEqual(42); //asleep / inBed is not integer
});

test("that calculateSleepScore returns Invalid when bad input", () => {
  expect(calculateSleepScore(0, 7)).toEqual(-1); //asleep > bed
  expect(calculateSleepScore(7)).toEqual(-1); //missing asleep
  expect(calculateSleepScore()).toEqual(-1); //missing inBed and asleep
  expect(calculateSleepScore("Alpha", true)).toEqual(-1); //inBed and asleep are the wrong types
});

test("that getScoreColor returns color based on score, or no color if score is invalid", () => {
  expect(getScoreColor(100)).toEqual("green");
  expect(getScoreColor(79)).toEqual("orange");
  expect(getScoreColor(0)).toEqual("red");
  expect(getScoreColor("melon")).toEqual(null);
  expect(getScoreColor(-50)).toEqual(null);
  expect(getScoreColor(256)).toEqual(null);
});

test("that get times generates Options for valid times and not for invalid times", () => {
  expect(getTimes(14).length).toEqual(29);
  expect(getTimes(0).length).toEqual(1);
  expect(getTimes(-1).length).toEqual(0);
  expect(getTimes().length).toEqual(49);
})