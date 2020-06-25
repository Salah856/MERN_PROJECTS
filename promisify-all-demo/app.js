const Promise = require('bluebird');

const fs = Promise.promisifyAll(require('fs'));

fs.readFileAsync('greet.txt','utf8')
.then(contents => {
 console.log(contents);
})
.catch(err => console.error(err));

fs.readFile('greet.txt','utf8',(err,contents) => console.log(contents));


