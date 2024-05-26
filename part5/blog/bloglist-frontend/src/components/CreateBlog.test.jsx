import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

// add user input since component is defined differently

test("blog creation works as intended", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlog create={createBlog} />);
  const sendButton = screen.getByText("create");

  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");

  await user.type(titleInput, "hohoho");
  await user.type(authorInput, "bython");
  await user.type(urlInput, "you.com");

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("hohoho");
  expect(createBlog.mock.calls[0][0].author).toBe("bython");
  expect(createBlog.mock.calls[0][0].url).toBe("you.com");
});
