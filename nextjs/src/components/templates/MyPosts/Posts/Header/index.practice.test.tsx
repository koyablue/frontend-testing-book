import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { Header } from ".";

const user = userEvent.setup();

const setup = (url = "/my/posts?page=1") => {
  mockRouter.setCurrentUrl(url);
  render(<Header />);
  const combobox = screen.getByRole("combobox", { name: "公開ステータス" });
  const selectOption = async (label: string) => {
    await user.selectOptions(combobox, label);
  };
  return { combobox, selectOption };
};

describe("投稿記事一覽画面Header", () => {
  test("初期状態で「すべて」が選択されている", () => {
    const { combobox } = setup();
    expect(combobox).toHaveDisplayValue("すべて");
  });

  test.each([
    { url: "/my/posts?status=public", displayValue: "公開" },
    { url: "/my/posts?status=private", displayValue: "下書き" },
  ])("$urlアクセスの場合は「$displayValue」が選択されている", (params) => {
    const { combobox } = setup(params.url);
    expect(combobox).toHaveDisplayValue(params.displayValue);
  });

  test("公開ステータスを変更するとクエリパラメータのstatusが変更される", async () => {
    const { selectOption } = setup();
    // https://www.npmjs.com/package/next-router-mock
    expect(mockRouter).toMatchObject({ query: { page: "1" } });

    await selectOption("公開");
    expect(mockRouter).toMatchObject({
      query: { page: "1", status: "public" },
    });

    await selectOption("下書き");
    expect(mockRouter).toMatchObject({
      query: { page: "1", status: "private" },
    });
  });
});
