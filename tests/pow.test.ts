import { assert, expect, test } from "vitest";

test("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2);
  expect(Math.sqrt(144)).toBe(12);
  expect(Math.sqrt(2)).toBe(Math.SQRT2);
  expect(3).toBe(Math.pow(2, 3));
});
