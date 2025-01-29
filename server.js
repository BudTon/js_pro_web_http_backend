const http = require('http');
const Koa = require('koa')
const koaBody = require('koa-body').default
const cors = require('@koa/cors');
const TicketStoreg = require('./TicketStoreg.class.js');

const app = new Koa();

app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}))

const tickets = new TicketStoreg();
app.use(async ctx => {

  const { method } = ctx.request.query;

  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets.find();
      return;
    case 'changeTicket':
      ctx.response.body = tickets.change(ctx.request.body, ctx.request.query.id);
      return;
    case 'createTicket':
      ctx.response.body = tickets.create(ctx.request.body)
      break;
    case 'deleteTicket':   
      ctx.response.body = tickets.delete(ctx.request.query.id)
      break;
    case 'statusTicket':
      ctx.response.body = tickets.status(ctx.request.query);
      return;
    default:
      ctx.response.status = 404;
      return;
  }
});


const server = http.createServer(app.callback())

const port = 7070;
// слушаем определённый порт
server.listen(port, (err) => {
  if (err) {
    return console.log('Error occured:', err)
  }
  console.log(`Server is listening on ${port}`)
});
