/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, screen } from "@testing-library/react";
import App from "App";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import { setupStore } from "store";
import { fetchPosts } from "store/reducers/posts.reducers";
import { renderWithProviders } from "utils/test-utils";

const apiResponse = [
  { id: 1, title: "Test title 1", body: "Body text 1" },
  { id: 2, title: "Test title 2", body: "Body text 2" },
  { id: 3, title: "Test title 3", body: "Body text 3" },
  { id: 4, title: "Test title 4", body: "Body text 4" },
];

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(apiResponse)
    );
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

jest.setTimeout(10000);

test("renders the posts page", async () => {
  const store = setupStore();
  store.dispatch(fetchPosts());

  await act(async () => {
    renderWithProviders(<App />, { store });
  });

  // all categories need to be present
  expect(screen.getByText(/Cat 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Cat 2/i)).toBeInTheDocument();

  // all subcategories need to be present
  expect(screen.getByText(/Subcat1_1/i)).toBeInTheDocument();
  expect(screen.getByText(/Subcat1_2/i)).toBeInTheDocument();
  expect(screen.getByText(/Subcat1_3/i)).toBeInTheDocument();
  expect(screen.getByText(/Subcat2_1/i)).toBeInTheDocument();
  expect(screen.getByText(/Subcat2_2/i)).toBeInTheDocument();
});

test("should show posts under each category", async () => {
  const store = setupStore();
  store.dispatch(fetchPosts());

  await act(async () => {
    renderWithProviders(<App />, { store });
  });

  fireEvent.click(screen.getByText(/Subcat1_1/i));
  expect(await screen.findByText(new RegExp(apiResponse[0].title, 'i'))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(apiResponse[0].title, 'i'))).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Subcat1_2/i));
  expect(await screen.findByText(new RegExp(apiResponse[1].title, 'i'))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(apiResponse[1].title, 'i'))).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Subcat1_3/i));
  expect(await screen.findByText(new RegExp(apiResponse[2].title, 'i'))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(apiResponse[2].title, 'i'))).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Subcat2_1/i));
  expect(await screen.findByText(new RegExp(apiResponse[3].title, 'i'))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(apiResponse[3].title, 'i'))).toBeInTheDocument();
});
