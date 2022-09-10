const Koa = require('koa')
const bodyParser = require('koa-bodyparser')    //引入body转换中间件
const fs = require('fs')
const path = require('path')
const {parse, stringify} = require('csv/sync');

const fsPromise = fs.promises

const app = new Koa();

app.use(bodyParser())   //启用body转换中间件

let bills = null
let categories=null

async function getCSVContent(path) {
  const fileContent = await fsPromise.readFile(path);
  return parse(fileContent, {columns: true})
}

app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.body = 'hello'
  } else if (ctx.url === '/bills') {
    if (ctx.method === 'GET') {

      if (bills) {
        ctx.body = bills;
      } else {
        ctx.body = bills = await getCSVContent(__dirname + '/bill.csv');
      }

    } else if (ctx.method === 'POST') {
      const requestBody = ctx.request.body;
      if (!bills) {
        bills = await getCSVContent(__dirname + '/bill.csv')
      }
      bills.push(requestBody);
      const output = await stringify(bills, {header: true})
      await fsPromise.writeFile(path.join(__dirname, '/bill.csv'), output);
      ctx.body = requestBody
    } else {
      ctx.body = 'no support'
    }
  } else if (ctx.url === '/categories') {
    if (ctx.method === 'GET') {
      if (categories) {
        ctx.body = categories;
      } else {
       ctx.body = categories = await getCSVContent(__dirname + '/categories.csv');
      }
    } else if (ctx.method === 'POST') {
      const requestBody = ctx.request.body;
      if (!categories) {
        categories = await getCSVContent(__dirname + '/categories.csv')
      }
      categories.push(requestBody);
      const output = await stringify(categories, {header: true})
      await fsPromise.writeFile(path.join(__dirname, '/categories.csv'), output);
      ctx.body = requestBody
    } else {
      ctx.body = 'no support'
    }
  } else {
    ctx.body = '<h1>404!</h1>';
  }
})

app.listen(3000, () => console.log('server start up on port 3000'))
