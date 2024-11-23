let schedule, datac;

const fetchCSV = (url, callback) => {
  fetch(url)
    .then((res) =>
      res.ok ? res.text() : Promise.reject(`HTTP error! Status: ${res.status}`)
    )
    .then((data) => callback(transposeArray(csvToArray(data))))
    .catch(console.error);
};


const csvToArray = (csv) =>
  csv
    .trim()
    .split("\n")
    .map((row) => row.split(","));
const transposeArray = (arr) => arr[0].map((_, i) => arr.map((row) => row[i]));
