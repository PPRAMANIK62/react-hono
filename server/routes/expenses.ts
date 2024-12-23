import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const expensesSchema = z.object({
  id: z.number().int().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().positive(),
});

type Expense = z.infer<typeof expensesSchema>;

const createPostSchema = expensesSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
  { id: 1, title: "Groceries", amount: 100 },
  { id: 2, title: "Rent", amount: 200 },
  { id: 3, title: "Gas", amount: 50 },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .post("/", zValidator("json", createPostSchema), (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...expense });
    return c.json(expense);
  })
  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ total });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) return c.notFound();
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) return c.notFound();
    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
// put
