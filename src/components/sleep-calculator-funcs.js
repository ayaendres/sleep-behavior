import React from "react";
import { Select} from "antd";
const {Option} = Select;

/**
 * Returns the calculated sleep score given valid inBed and asleep times, otherwise returns "Invalid"
 * @param inBed - number: time spent in bed in hours
 * @param asleep - number: time spent asleep in hours, expected to be <= inBed
 * @returns number - sleep score if input is valid. -1 if not
 */
export const calculateSleepScore = (inBed, asleep) => {
  //check for invalid (in this case more time asleep than in bed, or no time in bed
  if (!(typeof inBed === "number" && typeof asleep === "number")) {
    return -1;
  }
  if (asleep > inBed) {
    return -1;
  }
  if (inBed === 0) {
    return 0;
  }
  return Math.floor((asleep / inBed) * 100); //use floor to give integer result
}

/**
 * Color for the resulting sleep score display, based on the score.
 * @param score - number from 0 to 100
 * @returns {string|null} - css color for styles, null if input is invalid
 */
export const getScoreColor = (score) => {
  if (typeof score !== "number" || score > 100) {
    return null;
  }
  if (score > 79) return "green";
  if (score > 60) return "orange";
  if (score >= 0) return "red";
  return null;
}

/**
 * Generates an array of <Option/> components for the select dropdowns
 * in half hour increments up to the given input max time (or 24 hours in not provided)
 * @param inputTime - optional number of hours to populate
 * @returns {*[]}
 */
export const getTimes = (inputTime) => {
  if (inputTime && (typeof inputTime !== "number" || inputTime < 0)) {
    return [];
  }
  const maxTime = inputTime >= 0 ? inputTime : 24;
  let times = [];
  let time = 0;
  while (time <= maxTime) {
    const hours = Math.floor(time);
    const minutes = time !== hours;
    times.push(
      <Option value={time} key={time}>
        {hours.toString().padStart(2, "0")}:{minutes ? `30` : `00`}
      </Option>
    );
    time = time + 0.5;
  }
  return times;
};