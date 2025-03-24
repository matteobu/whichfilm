import { isDifferentDay } from "../../utils/utils";

describe("isDifferentDay", () => {
  test("returns true for different days", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isDifferentDay(yesterday.getTime(), Date.now())).toBe(true);
  });

  test("returns false for same day", () => {
    const now = Date.now();
    expect(isDifferentDay(now, now)).toBe(false);
  });
});