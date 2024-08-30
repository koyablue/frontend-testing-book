import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as Fetchers from "./fetchers";
import { httpError, postMyAddressMock } from "./fetchers/fixtures";
import { RegisterAddress } from "./RegisterAddress";

jest.mock("./fetchers");

const user = userEvent.setup();

// 連絡先
const contactValue = {
  name: "サンプル名前",
  phoneNumber: "07011111111",
};

// 連絡先の入力
const fillContactInfo = async () => {
  const phoneInput = screen.getByRole("textbox", { name: "電話番号" });
  await user.type(phoneInput, contactValue.phoneNumber);
  const nameInput = screen.getByRole("textbox", { name: "お名前" });
  await user.type(nameInput, contactValue.name);
};

// 住所
const addressValue = {
  postalCode: "111-1111",
  prefectures: "東京都",
  municipalities: "杉並区荻窪",
  streetNumber: "1-1-1",
};

// 住所の入力
const fillAddress = async () => {
  const postalCodeInput = screen.getByRole("textbox", { name: "郵便番号" });
  await user.type(postalCodeInput, addressValue.postalCode);
  const prefInput = screen.getByRole("textbox", { name: "都道府県" });
  await user.type(prefInput, addressValue.prefectures);
  const cityInput = screen.getByRole("textbox", { name: "市区町村" });
  await user.type(cityInput, addressValue.municipalities);
  const streetNumInput = screen.getByRole("textbox", { name: "番地番号" });
  await user.type(streetNumInput, addressValue.streetNumber);
};

const clickSubmitButton = async () => {
  await user.click(
    screen.getByRole("button", { name: "注文内容の確認へ進む" })
  );
};

const mockPostMyAddress = (status = 200) => {
  if (status > 299) {
    return jest
      .spyOn(Fetchers, "postMyAddress")
      .mockRejectedValueOnce(httpError);
  }

  return jest
    .spyOn(Fetchers, "postMyAddress")
    .mockResolvedValueOnce(postMyAddressMock);
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe("RegisterAddress component", () => {
  test("成功時", async () => {
    const mock = mockPostMyAddress();
    render(<RegisterAddress />);
    await fillContactInfo();
    await fillAddress();
    await clickSubmitButton();
    expect(mock).toHaveBeenCalledWith({ ...contactValue, ...addressValue });
    expect(screen.getByText("登録しました")).toBeInTheDocument();
  });

  test("バリデーション失敗時", async () => {
    const mock = mockPostMyAddress();
    render(<RegisterAddress />);
    await clickSubmitButton();
    expect(mock).not.toHaveBeenCalled();
    expect(
      screen.getByText("不正な入力値が含まれています")
    ).toBeInTheDocument();
  });

  test("通信失敗時", async () => {
    const mock = mockPostMyAddress(500);
    render(<RegisterAddress />);
    await fillContactInfo();
    await fillAddress();
    await clickSubmitButton();
    expect(mock).toHaveBeenCalledWith({ ...contactValue, ...addressValue });
    expect(screen.getByText("登録に失敗しました")).toBeInTheDocument();
  });

  test("不明なエラー発生時", async () => {
    render(<RegisterAddress />);
    await fillContactInfo();
    await fillAddress();
    await clickSubmitButton();
    expect(screen.getByText("不明なエラーが発生しました")).toBeInTheDocument();
  });
});
