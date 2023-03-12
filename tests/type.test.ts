import { expectTypeOf, test } from "vitest";
test("Type", () => {
  expectTypeOf({ a: 1 }).toEqualTypeOf<{ a: number }>();
  expectTypeOf({ a: 1 }).toEqualTypeOf({ a: 1 });
  expectTypeOf({ a: "1" }).toEqualTypeOf({ a: "1" });
  expectTypeOf({ a: "1" }).toEqualTypeOf<{ a: string }>();
});
