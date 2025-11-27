const fetchCSV = (csv, callback) => {
  callback(transposeArray(csvToArray(csv)));
};

const csvToArray = (csv) =>
  csv
    .trim()
    .split("\n")
    .map((row) => row.split(","));
const transposeArray = (arr) => arr[0].map((_, i) => arr.map((row) => row[i])); 

let schedule = ``;
let datac = ``;
let other = false;

setTimeout(()=>console.log(schedule.length, datac.length), 5000);