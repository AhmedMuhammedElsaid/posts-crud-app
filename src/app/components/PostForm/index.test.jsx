import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios"; // You might want to consider using a testing library for mocking HTTP requests, like `axios-mock-adapter`.
import { toast } from "react-toastify";
import PostForm from "./index.tsx";

// Mocking axios to prevent actual HTTP requests during testing
jest.mock("axios");

describe("test PostForm component scenaries", () => {
  beforeEach(() => {
    // Mocking the toast methods to prevent actual toast notifications during testing
    jest.spyOn(toast, "success").mockImplementation(() => {});
    jest.spyOn(toast, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders PostForm with Create button and submits form", async () => {
    // Mocking a successful POST request
    axios.mockResolvedValueOnce({ status: 201 });

    const { asFragment } = render(<PostForm />);
    expect(asFragment()).toMatchSnapshot();
    const titleInput = screen.getByTestId("title-input");
    const bodyInput = screen.getByTestId("body-input");
    const submitButton = screen.getByTestId("submit-button");

    // Filling in form inputs
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(bodyInput, { target: { value: "Test Body" } });

    // Triggering form submission
    fireEvent.click(submitButton);

    // Waiting for the asynchronous actions to complete
    await waitFor(() => {
      expect(axios).toHaveBeenCalledWith(expect.stringContaining("posts"), {
        method: "POST",
        data: { title: "Test Title", body: "Test Body", userId: 1 },
      });
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(toast.success).toHaveBeenCalledWith("Post Created Successfully");
    });
  });
  test("renders PostForm with Edit button and submits form for editing", async () => {
    // Mocking a successful PUT request
    // axios.mockResolvedValueOnce({ status: 201 });
    // Mocking a successful GET request with specific post data
    const mockPostData = {
      data: {
        id: 1,
        title: "Test Title123",
        body: "Test Body123",
        userId: 1,
      },
      status: 200,
    };

    axios.mockResolvedValueOnce(mockPostData);

    render(<PostForm id={'1'} />);
  
    const titleInput = screen.getByTestId("title-input");
    const bodyInput = screen.getByTestId("body-input");
    const submitButton = screen.getByTestId("submit-button");

    // Filling in form inputs
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(bodyInput, { target: { value: "Test Body" } });

    // Triggering form submission
    fireEvent.click(submitButton);

    // Waiting for the asynchronous actions to complete
    await waitFor(() => {
      expect(axios).toHaveBeenCalledWith(expect.stringContaining("https://jsonplaceholder.typicode.com/posts"), {
        method: "PUT",
        data: { title: "Test Title", body: "Test Body", userId: 1,id:"1" },
      });
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(toast.success).toHaveBeenCalledWith(`Post Number 1 Edited Successfully`);
    });
    
  });
});
