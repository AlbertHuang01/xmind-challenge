const Koa = require("koa");
const bodyParser = require("koa-bodyparser"); //引入body转换中间件
const fs = require("fs");
const path = require("path");
const { parse, stringify } = require("csv/sync");

const fsPromise = fs.promises;

const app = new Koa();

app.use(bodyParser()); //启用body转换中间件

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With "
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method === "OPTIONS") {
    ctx.body = 200;
  } else {
    await next();
  }
});

async function getCSVContent(path, castFunction) {
  const fileContent = await fsPromise.readFile(path);
  return parse(fileContent, {
    cast: castFunction,
    columns: true,
    trim: true,
  });
}

function BillCastFunction(value, context) {
  if (context.header) return value;
  const { index } = context;
  if (index === 0 || index === 3) return Number(value);
  if (index === 1) return Number(value);
  return value;
}
function CategoriesCastFunction(value, context) {
  if (context.header) return value;
  const { index } = context;
  if (index === 1) return Number(value);
  return value;
}

app.use(async (ctx) => {
  if (ctx.url === "/" && ctx.method === "GET") {
    ctx.body = "hello";
  } else if (ctx.url === "/bills") {
    if (ctx.method === "GET") {
      ctx.body = await getCSVContent(__dirname + "/bill.csv", BillCastFunction);
    } else if (ctx.method === "POST") {
      const requestBody = ctx.request.body;

      const bills = await getCSVContent(__dirname + "/bill.csv", BillCastFunction);

      bills.push(requestBody);
      const output = await stringify(bills, { header: true });
      await fsPromise.writeFile(path.join(__dirname, "/bill.csv"), output);
      ctx.body = requestBody;
    } else {
      ctx.body = "no support";
    }
  } else if (ctx.url === "/categories") {
    if (ctx.method === "GET") {
      ctx.body = await getCSVContent(__dirname + "/categories.csv", CategoriesCastFunction);
    } else if (ctx.method === "POST") {
      const requestBody = ctx.request.body;
      const categories = await getCSVContent(__dirname + "/categories.csv", CategoriesCastFunction);
      categories.push(requestBody);
      const output = await stringify(categories, { header: true });
      await fsPromise.writeFile(path.join(__dirname, "/categories.csv"), output);
      ctx.body = requestBody;
    } else {
      ctx.body = "no support";
    }
  } else {
    ctx.body = "<h1>404!</h1>";
  }
});

app.listen(3000, () => console.log("server start up on port 3000"));
