import { Bill } from './model';
import { API } from './const';
import  axios  from 'axios';
import demo from "./demo";

it("demo", () => {
  expect(demo()).toEqual("hello");
});

it('mock server', async()=>{
  const response=await axios.get(API.BILLS)
  const billList:Bill[]= response.data
  expect(billList.length).toEqual(4)
  expect(billList[0]).toEqual({
    "type": 0,
    "time": 1561910400000,
    "category": "8s0p77c323",
    "amount": 5400
  })
})
