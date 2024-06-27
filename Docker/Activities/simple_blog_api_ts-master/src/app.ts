import * as Koa from "koa";
import * as bodyParser from 'koa-bodyparser';
import * as HttpStatus from "http-status-codes";
import appController from "./routes/app/app.controller";
import blogController from "./routes/blog/blog.controller";

const app: Koa = new Koa();

app.use(bodyParser());
// Generic Error Handling Middleware
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    ctx.status =
      err.statusCode || err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    err.status = ctx.status;
    ctx.body = { err };
    ctx.app.emit("error", err, ctx);
  }
});

// HEALTH CHECK ROUTE
app.use(appController.routes());
app.use(appController.allowedMethods());
app.use(blogController.routes());
app.use(blogController.allowedMethods());

// Application error logging
app.on("error", console.error);

export default app;
