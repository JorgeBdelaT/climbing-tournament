import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultExampleSelect = Prisma.validator<Prisma.ExampleSelect>()({
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
});

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany({
        select: defaultExampleSelect,
      });
    },
  });
