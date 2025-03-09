import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { zValidator } from '@hono/zod-validator'
import { z } from "zod";

let valueA: number = 0;
let valueB: number = 0;

const app = new Hono();
app.use(cors({
  origin: "*",
}));


const routes = app.post("/",
  zValidator(
    'json', 
    z.object({
      valueA: z.number(),
      valueB: z.number(),
    })
  ),
  (c) => {
    const validated = c.req.valid('json');
    console.log(validated);
    valueA = validated.valueA;
    valueB = validated.valueB;

    return c.json({
      valueA,
      valueB,
    });
  }
).get("/", (c) => {
  return c.json({
    valueA,
    valueB,
  });
});

serve({
  fetch: app.fetch,
  port: 3333
}, (info) => {
  console.log(info);
});

export type AppType = typeof routes;