let schedule; let datac;
fetch("schedule.csv")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then((data) => {
    const table = csvToArray(data);
    const columns = transposeArray(table);
    schedule = columns;
    mapschedule();
  })
  .catch((error) => {
    console.error(error);
  });

fetch("data.csv")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then((data) => {
    const table = csvToArray(data);
    const columns = transposeArray(table);
    datac = columns;
    mapdata();
  })
  .catch((error) => {
    console.error(error);
  });

function csvToArray(csv) {
  return csv
    .trim()
    .split("\n")
    .map((row) => row.split(","));
}

function transposeArray(array) {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}