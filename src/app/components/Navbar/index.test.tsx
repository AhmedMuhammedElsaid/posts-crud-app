import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Navbar from "./index";

jest.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: "",
    asPath: "/",
  }),
}));

test("renders navbar", () => {
  const { asFragment } = render(<Navbar />);
  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByText("Posts")).toBeInTheDocument();
  expect(screen.getByText("Create Post")).toBeInTheDocument();
});
