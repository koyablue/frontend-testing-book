import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from ".";

const user = userEvent.setup();

const setup = () => {
  const onClickSave = jest.fn();
  const onValid = jest.fn();
  const onInvalid = jest.fn();
  render(
    <PostForm
      title="新規記事"
      onClickSave={onClickSave}
      onValid={onValid}
      onInvalid={onInvalid}
    />
  );

  const titleInput = screen.getByRole("textbox", { name: "記事タイトル" });

  const typeTitle = async (title: string) => {
    await user.type(titleInput, title);
  };

  const saveAsDraft = async () => {
    await user.click(screen.getByRole("button", { name: "下書き保存する" }));
  };

  const saveAsPublished = async () => {
    await user.click(screen.getByRole("switch", { name: "公開ステータス" }));
    await user.click(screen.getByRole("button", { name: "記事を公開する" }));
  };

  return {
    titleInput,
    onClickSave,
    onValid,
    onInvalid,
    typeTitle,
    saveAsDraft,
    saveAsPublished,
  };
};

describe("PostForm", () => {
  test("不正な値が入力されたときバリデーションが実行されフォームは送信されない", async () => {
    const { titleInput, saveAsDraft } = setup();
    await saveAsDraft();
    await waitFor(() => {
      expect(titleInput).toHaveErrorMessage("1文字以上入力してください");
    });
  });

  test("不正な内容で下書き保存を試みるとonInvalidハンドラーが実行される", async () => {
    const { onInvalid, onValid, onClickSave, saveAsDraft } = setup();
    await saveAsDraft();
    expect(onClickSave).toHaveBeenCalled();
    expect(onValid).not.toHaveBeenCalled();
    expect(onInvalid).toHaveBeenCalled();
  });

  test("適正内容な下書き保存を試みるとonValidハンドラーが実行される", async () => {
    const { typeTitle, onInvalid, onValid, onClickSave, saveAsDraft } = setup();
    const { selectImage } = selectImageFile();
    mockUploadImage();
    await typeTitle("title");
    await selectImage();
    await saveAsDraft();
    expect(onClickSave).toHaveBeenCalled();
    expect(onInvalid).not.toHaveBeenCalled();
    expect(onValid).toHaveBeenCalled();
  });
});
