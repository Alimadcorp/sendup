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

document.onload = () => {
  fetch("/data.csv").then((r)=>r.json()).then(data=>{datac=data});
  fetch("/schedule.csv").then((r)=>r.json()).then(data=>{schedule=data});
}
