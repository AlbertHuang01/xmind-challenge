import { renderHook } from "@testing-library/react-hooks";
import { useContext } from "react";
import * as Main from "./main";

describe("mock.test", () => {
  it("mock useContext(APP_DATA)", () => {
    // jest.spyOn(Main,'APP_DATA','get').mockReturnValue('')
    const {
      result: {
        current: { billList },
      },
    } = renderHook(() => useContext(Main.APP_DATA));

    expect(billList).toEqual([]);
  });
});
