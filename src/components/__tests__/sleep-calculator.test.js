import React from "react";
import {render, screen, fireEvent, waitFor, waitForElement, findByText} from '@testing-library/react';
import SleepCalculator from '../sleep-calculator';
import userEvent from "@testing-library/user-event";

/*
  Everything between here and the first test is just to get
  react testing library working with component libraries etc.
  and can be disregarded in terms of "what does it do"
  Its just mocking various functions so that the render function
  doesn't crash. In a larger project I would separate these
  and make them reusable.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.matchMedia = function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const Select = ({ children, onChange, value, ...otherProps }) => {
    const change = (e) => {
      onChange(Number(e.target.value));
    }
    return (<input {...otherProps} value={value || ""} onChange={change}/>);
  };

  Select.Option = ({ children, ...otherProps }) => {
    return <option {...otherProps}>{children}</option>;
  };

  return {
    ...antd,
    Select,
  };
});
/*
  End of Setup code
 */

test("that the sleep score calculator renders", () => {
  render(<SleepCalculator />);
  const title = screen.getByText(/sleep score calculator/i);
  expect(title).toBeInTheDocument();
});

test( "that each field can be updated",  async () => {
  const {getByPlaceholderText, getByTestId, getByText, findByText} = render(<SleepCalculator/>);
  userEvent.type(getByPlaceholderText(/in bed/i), "12");
  expect(getByTestId(/calculate/i)).toBeDisabled();
  userEvent.type(getByPlaceholderText(/asleep/i), "10");
  expect(getByTestId(/calculate/i)).not.toBeDisabled();

  fireEvent.click(getByTestId(/calculate/i));
  await findByText(/Your sleep score is/i);
  expect(getByText(/Your sleep score is/i)).toBeInTheDocument();
});

test("that bad input will show an error message", async () => {
  const {getByPlaceholderText, getByTestId, findByText} = render(<SleepCalculator/>);
  userEvent.type(getByPlaceholderText(/in bed/i), "6");
  expect(getByTestId(/calculate/i)).toBeDisabled();
  userEvent.type(getByPlaceholderText(/asleep/i), "10");
  expect(getByTestId(/calculate/i)).not.toBeDisabled();

  fireEvent.click(getByTestId(/calculate/i));
  await findByText(/We were unable to generate or save your sleep score/i);
});
