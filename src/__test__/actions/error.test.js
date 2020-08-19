import { clearError } from "actions/error";
import { CLEAR_ERROR } from "actions/types";

it("should setup clearError action object", () => {
  const action = clearError();
  expect(action).toEqual({
    type: CLEAR_ERROR,
  });
});
