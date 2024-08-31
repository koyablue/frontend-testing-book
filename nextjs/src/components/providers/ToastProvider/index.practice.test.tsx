// ToastProviderのテスト

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, ToastState } from ".";
import { useToastAction } from "./hooks";

const user = userEvent.setup();

const TestComponent = ({ message }: { message: string }) => {
  const { showToast } = useToastAction();
  return <button onClick={() => showToast({ message })}>show</button>;
};

describe("ToastProvider", () => {
  describe("カスタムフック", () => {
    test("useToastActionのshowToastでトーストが表示される", async () => {
      const message = "test";
      render(
        <ToastProvider>
          <TestComponent message={message} />
        </ToastProvider>
      );
      await user.click(screen.getByRole("button", { name: "show" }));
      expect(screen.getByRole("alert")).toHaveTextContent(message);
    });
  });

  describe("ToastProviderのprops通りのトーストが表示される", () => {
    test.each([
      { isShown: true, message: "Succeed", style: "succeed" },
      { isShown: true, message: "Failed", style: "failed" },
      { isShown: true, message: "Busy", style: "busy" },
    ] as ToastState[])("$message", (state) => {
      render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
      expect(screen.getByRole("alert")).toHaveTextContent(state.message);
    });
    // test("succeed", () => {
    //   const message = "Succeed";
    //   render(
    //     <ToastProvider
    //       defaultState={{
    //         isShown: true,
    //         message,
    //         style: "succeed",
    //       }}
    //     >
    //       {null}
    //     </ToastProvider>
    //   );
    //   expect(screen.getByRole("alert")).toHaveTextContent(message);
    // });
  });
});
