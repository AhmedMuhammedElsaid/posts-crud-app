import React from "react";
import { render, screen } from "@testing-library/react";
import PostsList from "./index";

test("renders posts list", () => {
  const mockPosts = [
    { id: 1, title: "Test Post 1", body: "This is a test post 1" },
    { id: 2, title: "Test Post 2", body: "This is a test post 2" },
  ];

  const { asFragment } = render(<PostsList posts={mockPosts} />);
  expect(asFragment()).toMatchSnapshot();
  mockPosts.forEach((post) => {
    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.body)).toBeInTheDocument();
  });
});
