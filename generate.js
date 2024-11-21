let initialhtm;

document.addEventListener("DOMContentLoaded", function () {
  const roll = localStorage.getItem("roll");
  const xtra = localStorage.getItem("xtra");
  if (roll != null) {
    document.getElementById("rollNoInput").value = roll;
    if (xtra === "yes") document.getElementById("extra").checked = true;
    console.log(xtra);
  }
});

function back() {
  document.getElementById("time").innerHTML = "";
  ["scheduleTable", "bb"].forEach((id) => (document.getElementById(id).style.display = "none"));
  document.getElementById("rest").style.display = "inline";
}

function generateSchedule() {
  const rollNoInput = document.getElementById("rollNoInput").value;
  const extras = document.getElementById("extra").checked;

  localStorage.setItem("xtra", extras ? "yes" : "no");

  if (!validate(rollNoInput)) return;

  const rollNo = extract(rollNoInput).rollNo;
  const grade = extract(rollNoInput).grade;

  localStorage.setItem("roll", rollNoInput);

  const time = grade === 2 ? "9 AM to 12 PM" : "1 PM to 4 PM";
  document.getElementById("time").innerHTML = `Exam Time: ${time}`;

  const table = document.getElementById("scheduleTable");
  table.style.display = "table";
  document.getElementById("rest").style.display = "none";
  document.getElementById("bb").style.display = "inline";

  if (initialhtm == null) initialhtm = table.innerHTML;
  table.innerHTML = initialhtm;

  const subjects = grade === 1 ? fsubjects : ssubjects;
  const subs = grade === 1 ? firsubs : secsubs;

  let n = 0;
  subjects.forEach((subject, i) => {
    if (subject == null) return;

    if (mins[i] === 0 && extras) {
      addScheduleRow(++n, subs, subject, centers[i], days[i], dates[i], time);
    } else if (rollNo >= mins[i] && rollNo <= maxes[i]) {
      addScheduleRow(++n, subs, subject, centers[i], days[i], dates[i], time);
    }
  });
}

function addScheduleRow(n, subs, subject, room, day, date, time) {
  let da, dat;
  subs.some((subArr, i) => {
    if (subArr.includes(subject)) {
      da = days[i].slice(0, 3);
      dat = formatDate(dates[i]);
      return true;
    }
    return false;
  });
  addRow(n, da, dat, subject, room, time);
}

function formatDate(inputDate) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [day, month] = inputDate.split("-");
  return `${day} ${months[parseInt(month) - 1]}`;
}

function addRow(number, day, date, subject, room, time) {
  const tableBody = document.querySelector("#scheduleTable tbody");
  const newRow = document.createElement("tr");

  [number, day, date, subject, room].forEach((text) => {
    const newCell = document.createElement("td");
    newCell.textContent = text;
    newRow.appendChild(newCell);
  });

  tableBody.appendChild(newRow);
}
