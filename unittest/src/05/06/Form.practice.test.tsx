import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { deliveryAddresses } from "./fixtures";
import { Form } from "./Form";

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

const mockFn = jest.fn();
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data: { [k: string]: unknown } = {};
  formData.forEach((v, k) => (data[k] = v));
  mockFn(data);
};

describe("お届け先情報の入力", () => {
  describe("過去のお届け先がない場合", () => {
    test("連絡先入力欄とお届け先入力欄がある", () => {
      render(<Form />);
      expect(screen.getByRole("group", { name: "連絡先" })).toBeInTheDocument();
      expect(
        screen.getByRole("group", { name: "お届け先" })
      ).toBeInTheDocument();
    });

    test("フォームを入力し送信すると入力内容が送信される", async () => {
      render(<Form onSubmit={onSubmit} />);
      await fillContactInfo();
      await fillAddress();
      await clickSubmitButton();
      expect(mockFn).toHaveBeenCalledWith({ ...contactValue, ...addressValue });
    });
  });

  describe("過去のお届け先がある場合", () => {
    test("連絡先入力欄と設問がある お届け先入力欄はない", () => {
      render(<Form deliveryAddresses={deliveryAddresses} />);
      expect(screen.getByRole("group", { name: "連絡先" })).toBeInTheDocument();
      expect(
        screen.queryByRole("group", { name: "お届け先" })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("group", { name: "新しいお届け先を登録しますか？" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("group", { name: "過去のお届け先" })
      ).not.toBeEnabled();
    });

    test("いいえ 選択で過去のお届け先が活性", async () => {
      render(<Form deliveryAddresses={deliveryAddresses} />);
      const noRadio = screen.getByLabelText("いいえ");
      await user.click(noRadio);
      expect(
        screen.getByRole("group", { name: "過去のお届け先" })
      ).toBeEnabled();
    });

    test("いいえ 選択し送信ボタンを押下で過去のお届け先の内容が送信される", async () => {
      render(
        <Form deliveryAddresses={deliveryAddresses} onSubmit={onSubmit} />
      );
      await fillContactInfo();
      const noRadio = screen.getByLabelText("いいえ");
      await user.click(noRadio);
      await clickSubmitButton();
      expect(mockFn).toHaveBeenCalledWith(
        expect.objectContaining(contactValue)
      );
    });

    test("はい 選択し送信ボタン押下で入力内容が送信される", async () => {
      render(
        <Form deliveryAddresses={deliveryAddresses} onSubmit={onSubmit} />
      );
      await fillContactInfo();
      const yesRadio = screen.getByLabelText("はい");
      await user.click(yesRadio);
      expect(
        screen.getByRole("group", { name: "新しいお届け先" })
      ).toBeInTheDocument();
      await fillAddress();
      await clickSubmitButton();
      expect(mockFn).toBeCalledWith(
        expect.objectContaining({ ...contactValue, ...addressValue })
      );
    });
  });
});
