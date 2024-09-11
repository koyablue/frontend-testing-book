import * as MyPosts from "@/services/client/MyPosts/__mock__/msw";
import * as MyProfile from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MyPostsCreate } from ".";

const user = userEvent.setup();

setupMockServer(...MyPosts.handlers, ...MyProfile.handlers);
beforeEach(() => {
  mockUploadImage();
  mockRouter.setCurrentUrl("/my/posts/create");
});

// describe("MyPostsCreate Component", () => {
//   it("opens AlertDialog when save button is clicked and isPublish is true", async () => {
//     // Arrange
//     render(<MyPostsCreate />);
//     await user.type(
//       screen.getByRole("textbox", { name: "記事タイトル" }),
//       "test"
//     );
//     const { selectImage } = selectImageFile();
//     await selectImage();

//     await user.click(screen.getByRole("switch", { name: "公開ステータス" }));
//     await user.click(screen.getByRole("button", { name: "記事を公開する" }));

//     // const saveButton = screen.getByRole("button", { name: /保存/i });

//     // // Act
//     // fireEvent.click(saveButton);
//     await screen.findByRole("alertdialog");

//     // Assert
//     expect(
//       screen.getByText("記事を公開します。よろしいですか？")
//     ).toBeInTheDocument();
//   });
// });

describe("MyPostsCreate Component", () => {
  it("opens AlertDialog when save button is clicked and isPublish is true", async () => {
    // Arrange
    render(<MyPostsCreate />);
    await user.type(
      screen.getByRole("textbox", { name: "記事タイトル" }),
      "test"
    );
    const { selectImage } = selectImageFile();
    await selectImage();

    await user.click(screen.getByRole("switch", { name: "公開ステータス" }));
    await user.click(screen.getByRole("button", { name: "記事を公開する" }));

    // Assert: AlertDialog の role を探す
    const alertDialog = await screen.findByRole("alertdialog");

    // ダイアログ内のテキストを確認
    expect(alertDialog).toBeInTheDocument();
    expect(
      screen.getByText("記事を公開します。よろしいですか？")
    ).toBeInTheDocument();
  });
});
