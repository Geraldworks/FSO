import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content correctly at start", () => {
  const blog = {
    title: "testing blog",
    author: "herad mogo",
    url: "happy.com",
    likes: 10,
  };

  const { container } = render(<Blog blog={blog} />);

  const titleAuthorP = container.querySelector(".title-author-unclicked");
  expect(titleAuthorP).toHaveTextContent("testing blog");
  expect(titleAuthorP).toHaveTextContent("herad mogo");
  expect(titleAuthorP).not.toHaveTextContent("happy.com");
  expect(titleAuthorP).not.toHaveTextContent(10);
});

test("renders content correctly after button click", async () => {
  const blog = {
    title: "testing blog",
    author: "herad mogo",
    url: "happy.com",
    likes: 10,
    user: {
      name: "gerald",
    },
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".title-author-clicked");
  expect(div).not.toBeNull();
  expect(div).toHaveTextContent("happy.com");
  expect(div).toHaveTextContent(10);
});

test("clicking like button twice triggers correctly", async () => {
  const blog = {
    title: "testing blog",
    author: "herad mogo",
    url: "happy.com",
    likes: 10,
    user: {
      name: "gerald",
    },
  };
  const mockHandler = vi.fn();
  render(<Blog blog={blog} blogUpdater={mockHandler} />);

  const user = userEvent.setup();
  const showButton = screen.getByText("view");
  await user.click(showButton);
  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
