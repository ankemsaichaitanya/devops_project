import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Weather from "./Weather";

// Mock fetch before each test
beforeEach(() => {
  global.fetch = jest.fn();
});

test("shows error when city is empty", async () => {
  render(<Weather />);
  const button = screen.getByText("Get Weather");
  fireEvent.click(button);
  expect(await screen.findByText("Please enter a city name")).toBeInTheDocument();
});

test("shows loading when fetching data", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ main: { temp: 25 } }),
  });

  render(<Weather />);
  fireEvent.change(screen.getByPlaceholderText("Enter city"), {
    target: { value: "Paris" },
  });
  fireEvent.click(screen.getByText("Get Weather"));

  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByText("The temperature in Paris is 25°C")).toBeInTheDocument()
  );
});

test("shows error if city not found", async () => {
  fetch.mockResolvedValueOnce({ ok: false });

  render(<Weather />);
  fireEvent.change(screen.getByPlaceholderText("Enter city"), {
    target: { value: "InvalidCity" },
  });
  fireEvent.click(screen.getByText("Get Weather"));

  await waitFor(() =>
    expect(screen.getByText("City not found")).toBeInTheDocument()
  );
});

test("shows weather data when API returns success", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ main: { temp: 30 } }),
  });

  render(<Weather />);
  fireEvent.change(screen.getByPlaceholderText("Enter city"), {
    target: { value: "Delhi" },
  });
  fireEvent.click(screen.getByText("Get Weather"));

  await waitFor(() =>
    expect(screen.getByText("The temperature in Delhi is 30°C")).toBeInTheDocument()
  );
});
