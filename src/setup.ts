import { rest } from 'msw'
import { setupServer } from "msw/node";
import axios from 'axios'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// axios.defaults.baseURL = API.BASE_URL;

// mock server
// const handlers = [
//   rest.get(API.BASE_URL+API.BILLS, async (_req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json([
//         {
//           "type": 0,
//           "time": 1561910400000,
//           "category": "8s0p77c323",
//           "amount": 5400
//         },
//         {
//           "type": 0,
//           "time": 1561910400000,
//           "category": "0fnhbcle6hg",
//           "amount": 1500
//         },
//         {
//           "type": 0,
//           "time": 1563897600000,
//           "category": "3tqndrjqgrg",
//           "amount": 3900
//         },
//         {
//           "type": 0,
//           "time": 1564502400000,
//           "category": "bsn20th0k2o",
//           "amount": 1900
//         },

//       ])
//     );
//   }),
//   rest.get(API.BASE_URL+API.CATEGORIES,async(_req,res,ctx)=>{
//     return res(
//       ctx.status(200),
//       ctx.json([
//         {
//           "id": "1bcddudhmh",
//           "type": 0,
//           "name": "车贷"
//         },{
//           "id": "hc5g66kviq",
//           "type": 0,
//           "name": "车辆保养"
//         },{
//           "id": "8s0p77c323",
//           "type": 0,
//           "name": "房贷"
//         }
//       ])
//     )
//   })
// ];

// const server = setupServer(...handlers);

// beforeAll(() => {
//   server.listen();
// });

// afterEach(() => {
//   server.restoreHandlers();
// });

// afterAll(() => {
//   server.close();
// });
