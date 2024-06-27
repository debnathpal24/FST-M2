import * as Koa from "koa";
import * as Router from "koa-router";

const router: Router = new Router();

router.get("/", async (ctx: Koa.Context) => {
  ctx.body = "Welcome to Simple Blog API";
});

router.get("/health_check", async (ctx: Koa.Context) => {
  ctx.body = "Ok";
});

export default router;
