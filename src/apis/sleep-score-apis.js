const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * This is a simple mock of the AJAX request, without all the frill of a fetch
 * or more likely the use of a package like axios. I decided not to spend
 * my time here so I could focus on what I felt was the core of the project.
 * @param score - integer from 0 to 100 representing score
 * @returns boolean - mocked API response boiled down to a true if input is valid and false if not
 */
export const mockSleepScoreApi = async (score) => {
  await delay(500);
  return !!(typeof score === "number" && score <= 100 && score >= 0);
};
