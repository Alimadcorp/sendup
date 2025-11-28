function cleanup() {
  showPopup("Clean Up", "Enter a range of rows to remove");
}
function showPopup(title, description) {
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-description").innerText = description;
  document.getElementById("popup-overlay").style.display = "flex";
  document.getElementById("cleanerr").textContent = "";
  document.getElementById("popup-input").value =
    localStorage.getItem("cin") || "";
}
function hidePopup() {
  document.getElementById("popup-overlay").style.display = "none";
}
document.getElementById("popup-ok").addEventListener("click", () => {
  const input = document.getElementById("popup-input").value;
  let errore = false;
  const table = document.getElementById("scheduleTable");
  let n = table.rows.length;
  try {
    const ranges = input.split(",").map((range) => range.trim());
    if (!ranges.length || ranges.some((range) => range === "")) {
      throwError("Invalid Input");
      errore = true;
    }
    ranges.forEach((range) => {
      if (range.includes("-")) {
        const [start, end] = range.split("-").map(Number);
        if (isNaN(start) || isNaN(end)) {
          throwError("Invalid range");
          errore = true;
        }
        if(start <= 0 || end >= n){
          throwError("Index out of Bounds");
          errore = true;
        }
      } else {
        const num = Number(range);
        if (isNaN(num)) {
          throwError("Invalid number");
          errore = true;
        }
        if(num <= 0 || num >= n){
          throwError("Index out of Bounds");
          errore = true;
        }
      }
    });
  } catch (error) {
    throwError(error);
    errore = true;
  }
  
  if (!errore) {
    perform();
  }
});
function perform() {
  const input = document.getElementById("popup-input").value;
  const ranges = input.split(",").map((range) => range.trim());
  ranges.forEach((range) => {
    if (range.includes("-")) {
      const [start, end] = range.split("-").map(Number);
      if (start <= end) {
        for (let i = end; i >= start; i--) func(i);
      } else {
        for (let i = start; i >= end; i--) func(i);
      }
    } else {
      const num = Number(range);
      func(num);
    }
  });
  for(let i = 1; i < document.getElementById("scheduleTable").rows.length; i++){
    settb(i);
  }
  hidePopup();
  localStorage.setItem("cin", input);
}
function throwError(err) {
  document.getElementById("cleanerr").textContent = err;
}
function func(inp) {
  if(inp > 0){
    try{
  const table = document.getElementById("scheduleTable");
  table.deleteRow(inp);
    }
  catch(error){
    console.log(error + "Laaaaaaaaaa");
    }
  }
}
function settb(val) {
  var table = document.getElementById("scheduleTable");
  if (!table) {
    console.error("Table with ID 'table' not found.");
    return;
  }
  var rows = table.getElementsByTagName('tr');
  if (val < 0 || val >= rows.length) {
    console.error("Invalid row index: " + val);
    return;
  }
  var tr = rows[val];
  var tds = tr.getElementsByTagName('td');
  if (tds.length === 0) {
    console.error("No <td> elements found in row " + val);
    return;
  }
  tds[0].innerHTML = val;
}
document.getElementById("popup-cancel").addEventListener("click", hidePopup);
