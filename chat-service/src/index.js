const Koa = require("koa");
const route = require("koa-route");
const websockify = require("koa-websocket");
const ChatRoom = require("./chat-room");

const app = websockify(new Koa());

const channels = {
  test: new ChatRoom(),
  alt: new ChatRoom(),
  general: new ChatRoom(),
};

app.use(
  route.get("/chat/latest/:id", (ctx, id) => {
    ctx.body = channels[id].latestMessages();
  })
);

app.ws.use(
  route.all("/chat/messages/:id", (ctx, id) => {
    const channel = channels[id];
    channel.add(ctx.websocket);
    ctx.websocket.on("message", (message) => {
      console.log(message);
      channel.broadcast(message);
    });
    ctx.websocket.on("close", () => {
      channel.remove(ctx.websocket);
    });
  })
);

app.listen(3000);
