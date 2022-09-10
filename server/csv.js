var fs = require('fs').promises;
var fs2 = require('fs')
var {parse, stringify} = require('csv/sync');
(async function () {
  const fileContent = await fs.readFile('./bill.csv');
  const records = parse(fileContent, {columns: true});
  console.log('读取csv records.length', records.length)


  records.push({
    type: 111,
    time: 11,
    category: 11,
    amount: 111,
  })

  console.log('csv append', records[records.length - 1])

// 写入csv
  const output= await stringify(records, {header: true})
  fs2.writeFile(__dirname+'./bill2.csv', output, () => console.log('写入成功'));

})();

