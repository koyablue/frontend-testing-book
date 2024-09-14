import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as Fetchers from "./fetchers";
import { httpError } from "./fetchers/fixtures";
import { RegisterAddress } from "./RegisterAddress";

jest.mock("./fetchers");

const user = userEvent.setup();

const mockPostMyAddress = (status = 200) => {
  const spy = jest.spyOn(Fetchers, "postMyAddress");
  return status > 299
    ? spy.mockResolvedValueOnce({
        result: "ok",
      })
    : spy.mockRejectedValueOnce(httpError);
};

const fillContactInfo = async (
  inputValues = {
    name: "Taro",
    phoneNumber: "09011111111",
  }
) => {
  await user.type(
    screen.getByRole("textbox", { name: "電話番号" }),
    inputValues.phoneNumber
  );
  await user.type(
    screen.getByRole("textbox", { name: "お名前" }),
    inputValues.name
  );

  return inputValues;
};

const fillAddress = async (
  inputValues = {
    postalCode: "167-0051",
    prefectures: "東京都",
    municipalities: "杉並区荻窪1",
    streetNumber: "00-00",
  }
) => {
  await user.type(
    screen.getByRole("textbox", { name: "郵便番号" }),
    inputValues.postalCode
  );
  await user.type(
    screen.getByRole("textbox", { name: "都道府県" }),
    inputValues.prefectures
  );
  await user.type(
    screen.getByRole("textbox", { name: "市区町村" }),
    inputValues.municipalities
  );
  await user.type(
    screen.getByRole("textbox", { name: "番地番号" }),
    inputValues.streetNumber
  );

  return inputValues;
};

const clickSubmitButton = async () => {
  await user.click(
    screen.getByRole("button", { name: "注文内容の確認へ進む" })
  );
};

describe("RegisterAddress", () => {
  beforeEach(() => {
    render(<RegisterAddress />);
  });

  test("有効な値を入力し送信ボタンを押すと入力値でフォームが送信され、「登録しました」のメッセージが表示される", async () => {
    const mockFn = mockPostMyAddress();
    const contactInfo = await fillContactInfo();
    const address = await fillAddress();
    await clickSubmitButton();
    expect(mockFn).toHaveBeenCalledWith({ ...contactInfo, ...address });
    waitFor(() => {
      expect(screen.getByText("登録しました")).toBeInTheDocument();
    });
  });

  test("無効な電話番号を入力し送信ボタンを押すとバリデーションエラーになり「不正な入力値が含まれています」のメッセージが表示される", async () => {
    const mockFn = mockPostMyAddress();
    await fillContactInfo({
      name: "Taro",
      phoneNumber: "a",
    });
    await fillAddress();
    await clickSubmitButton();
    expect(mockFn).not.toHaveBeenCalled();
    waitFor(() => {
      expect(
        screen.getByText("不正な入力値が含まれています")
      ).toBeInTheDocument();
    });
  });

  test("通信に失敗した際、「登録に失敗しました」のメッセージが表示される", async () => {
    const mockFn = mockPostMyAddress(500);
    const contactInfo = await fillContactInfo();
    const address = await fillAddress();
    await clickSubmitButton();
    expect(mockFn).toHaveBeenCalledWith({ ...contactInfo, ...address });
    waitFor(() => {
      expect(screen.getByText("登録に失敗しました")).toBeInTheDocument();
    });
  });

  test("不明なエラーが発生した際、「不明なエラーが発生しました」のメッセージが表示される", async () => {
    await fillContactInfo();
    await fillAddress();
    await clickSubmitButton();
    waitFor(() => {
      expect(
        screen.getByText("不明なエラーが発生しました")
      ).toBeInTheDocument();
    });
  });
});
