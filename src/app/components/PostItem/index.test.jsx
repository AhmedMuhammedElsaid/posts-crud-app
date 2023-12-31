import React from "react";
import { render, screen, fireEvent, waitFor, } from "@testing-library/react";
import PostItem from "./index";

test("renders post item  and make sure that the data displayed correctly", async () => {
  const mockPost = {
    id: 1,
    title: "Test Post",
    body: "This is a test post",
  };

  const { asFragment } = render(<PostItem {...mockPost} />);
  expect(asFragment()).toMatchSnapshot();

  const postWrapper = screen.getByTestId(`test-${mockPost.id}`);
  const iconstWrapper = screen.getByTestId(`icons-wrapper`);
  const postTitle = screen.getByTestId(`post-title`);
  const postBody = screen.getByTestId(`post-body`);

  expect(iconstWrapper).toBeInTheDocument();
  expect(postWrapper).toBeInTheDocument();
  expect(postTitle).toHaveTextContent(mockPost.title);
  expect(postBody).toHaveTextContent(mockPost.body);

});
