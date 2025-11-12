import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";

// utility to fill and submit form
const addTask = async ({ title, description = "", category = "work", priority = "medium", dueDate = "" }) => {
  const titleInput = screen.getByLabelText(/title/i);
  fireEvent.change(titleInput, { target: { value: title } });

  const categorySelect = screen.getByLabelText(/category/i);
  fireEvent.change(categorySelect, { target: { value: category } });

  const prioritySelect = screen.getByLabelText(/priority/i);
  fireEvent.change(prioritySelect, { target: { value: priority } });

  const dueInput = screen.getByLabelText(/due date/i);
  if (dueDate) {
    fireEvent.change(dueInput, { target: { value: dueDate } });
  }

  const desc = screen.getByLabelText(/description/i);
  if (description) {
    fireEvent.change(desc, { target: { value: description } });
  }

  fireEvent.click(screen.getByRole("button", { name: /add task/i }));
};

describe("To-Do App", () => {
  beforeEach(() => {
    // ensure clean storage between tests
    window.localStorage.clear();
  });

  test("renders form and empty state", () => {
    render(<App />);
    expect(screen.getByLabelText(/add task form/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing here yet/i)).toBeInTheDocument();
  });

  test("can add a task and see it in the list", async () => {
    render(<App />);
    await addTask({ title: "Buy groceries", category: "personal", priority: "high", dueDate: "2030-01-01" });
    const cards = screen.getAllByTestId("task-card");
    expect(cards.length).toBe(1);
    expect(within(cards[0]).getByText(/buy groceries/i)).toBeInTheDocument();
    expect(within(cards[0]).getByText(/personal/i)).toBeInTheDocument();
    expect(within(cards[0]).getByText(/high/i)).toBeInTheDocument();
  });

  test("can toggle complete", async () => {
    render(<App />);
    await addTask({ title: "Task A" });
    const card = screen.getByTestId("task-card");
    const checkbox = within(card).getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("can filter by category and search", async () => {
    render(<App />);
    await addTask({ title: "Project report", category: "work" });
    await addTask({ title: "Gym session", category: "personal" });

    // filter by work
    fireEvent.change(screen.getByLabelText(/category/i, { selector: "select" }), { target: { value: "work" } });

    const cardsAfterFilter = screen.getAllByTestId("task-card");
    expect(cardsAfterFilter.length).toBe(1);
    expect(within(cardsAfterFilter[0]).getByText(/project report/i)).toBeInTheDocument();

    // search
    fireEvent.change(screen.getByLabelText(/search/i), { target: { value: "gym" } });
    expect(screen.queryByTestId("task-card")).toBeNull();
  });

  test("can delete a task", async () => {
    render(<App />);
    await addTask({ title: "Remove me" });
    const card = screen.getByTestId("task-card");
    fireEvent.click(within(card).getByRole("button", { name: /delete/i }));
    expect(screen.queryByTestId("task-card")).toBeNull();
  });

  test("persists tasks in localStorage", async () => {
    const { unmount, rerender } = render(<App />);
    await addTask({ title: "Persisted task" });
    // simulate remount
    unmount();
    rerender(<App />);
    const cards = screen.getAllByTestId("task-card");
    expect(cards.length).toBe(1);
    expect(within(cards[0]).getByText(/persisted task/i)).toBeInTheDocument();
  });
});
