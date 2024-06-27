import * as Koa from "koa";
import * as Router from "koa-router";
import { getManager, Repository } from "typeorm";
import postEntity from "../../entities/post.entity";
import { StatusCodes } from "http-status-codes";

const routerOpts: Router.IRouterOptions = {
  prefix: "/posts",
};

const router: Router = new Router(routerOpts);

router.get("/", async (ctx: Koa.Context) => {
  // Get the post repository from TypeORM
  const postRepo: Repository<postEntity> = getManager().getRepository(
    postEntity
  );

  // Get all the posts
  const posts = await postRepo.find();

  // Respond with all the posts
  ctx.body = {
    data: { posts },
  };
});

router.get("/:post_id", async (ctx: Koa.Context) => {
  // Get the post repository from TypeORM
  const postRepo: Repository<postEntity> = getManager().getRepository(
    postEntity
  );

  // Get the requested post
  const post = await postRepo.findOne(ctx.params.post_id);

  // If the post doesn't exist, then throw a 404.
  if (!post) {
    ctx.throw(StatusCodes.NOT_FOUND);
  }

  ctx.body = {
    data: { post },
  };
});

router.post("/", async (ctx: Koa.Context) => {
  // Get the post repository from TypeORM
  const postRepo: Repository<postEntity> = getManager().getRepository(
    postEntity
  );

  const reqBody = JSON.parse(JSON.stringify(ctx.request.body));

  const newPost = {
    title: reqBody.title,
    body: reqBody.body,
    author: reqBody.author,
  };

  const post: postEntity = postRepo.create(newPost);
  await postRepo.save(post);

  // Create the new Post
  ctx.body = {
    data: { post },
  };
});

router.delete("/:post_id", async (ctx: Koa.Context) => {
  // Get the post repo
  const postRepo: Repository<postEntity> = getManager().getRepository(
    postEntity
  );

  // Find the requested post
  const post: postEntity = await postRepo.findOne(ctx.params.post_id);

  // Delete the post
  await postRepo.remove(post);

  // Respond with no data, but make sure we have a 204 response code
  ctx.status = StatusCodes.NO_CONTENT;
});

router.patch("/:post_id", async (ctx: Koa.Context) => {
  // Get the post repo
  const postRepo: Repository<postEntity> = getManager().getRepository(
    postEntity
  );

  // Find the requested post
  const post: postEntity = await postRepo.findOne(ctx.params.post_id);

  // If the post doesn't exist, throw a 404
  if (!post) {
    ctx.throw(StatusCodes.NOT_FOUND);
  }

  // Merge the existing post with the new data
  const updatedPost = postRepo.merge(post, ctx.request.body as any);

  // Save the new Data
  postRepo.save(updatedPost);

  // Respond with our new post data
  ctx.body = {
    data: { post: updatedPost },
  };
});

export default router;
