import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Form } from "./Form";

const user = userEvent.setup();

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
      const mockFn = jest.fn();
      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: { [k: string]: unknown } = {};
        formData.forEach((v, k) => (data[k] = v));
        mockFn(data);
      };

      render(<Form onSubmit={onSubmit} />);

      // 連絡先の入力
      const contactValue = {
        name: "サンプル名前",
        phoneNumber: "07011111111",
      };
      const phoneInput = screen.getByRole("textbox", { name: "電話番号" });
      await userEvent.type(phoneInput, contactValue.phoneNumber);
      const nameInput = screen.getByRole("textbox", { name: "お名前" });
      await userEvent.type(nameInput, contactValue.name);

      // お届け先の入力
      const addressValue = {
        postalCode: "111-1111",
        prefectures: "東京都",
        municipalities: "杉並区荻窪",
        streetNumber: "1-1-1",
      };
      const postalCodeInput = screen.getByRole("textbox", { name: "郵便番号" });
      await userEvent.type(postalCodeInput, addressValue.postalCode);
      const prefInput = screen.getByRole("textbox", { name: "都道府県" });
      await userEvent.type(prefInput, addressValue.prefectures);
      const cityInput = screen.getByRole("textbox", { name: "市区町村" });
      await userEvent.type(cityInput, addressValue.municipalities);
      const streetNumInput = screen.getByRole("textbox", { name: "番地番号" });
      await userEvent.type(streetNumInput, addressValue.streetNumber);

      await userEvent.click(
        screen.getByRole("button", { name: "注文内容の確認へ進む" })
      );

      expect(mockFn).toHaveBeenCalledWith({ ...contactValue, ...addressValue });
    });
  });
  describe("過去のお届け先がある場合", () => {
    test("連絡先入力欄と設問がある お届け先入力欄はない", () => {
      render(<Form />);
      expect(screen.getByRole("group", { name: "連絡先" })).toBeInTheDocument();
      expect(
        screen.getByRole("group", { name: "お届け先" })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("group", { name: "新しいお届け先を登録しますか？" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("group", { name: "過去のお届け先" })
      ).not.toBeEnabled();
    });
  });
});
