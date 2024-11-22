let initialhtm;
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("roll") != null) {
    document.getElementById("rollNoInput").value = localStorage.getItem("roll");
    if (localStorage.getItem("xtra") == "yes") {
      document.getElementById("extra").checked = true;
    }
  }
});
window.onload = function () {
  const savedOption = localStorage.getItem("selectedSubject") || "ICS";
  document.querySelector(
    `input[name="subject"][value="${savedOption}"]`
  ).checked = true;
};

document.querySelectorAll('input[name="subject"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    localStorage.setItem("selectedSubject", this.value);
  });
});

function back() {
  document.getElementById("log").innerHTML = "";
  const table = document.getElementById("scheduleTable");
  const other = document.getElementById("rest");
  const bb = document.getElementById("bb");
  document.getElementById("time").innerHTML = "";
  table.style.display = "none";
  bb.style.display = "none";
  other.style.display = "inline";
}
//document.getElementById("extra").addEventListener("change", function () {});
function generateSchedule() {
  const inputElement = document.getElementById("rollNoInput");
  const table = document.getElementById("scheduleTable");
  const other = document.getElementById("rest");
  const bb = document.getElementById("bb");
  const extra = document.getElementById("extra");
  const log = document.getElementById("log");
  let rollNoInput = inputElement.value;
  let extras = extra.checked;
  let logs = "MSv35";
  localStorage.setItem("xtra", extra.checked ? "yes" : "no");
  if (validate(rollNoInput)) {
    bb.style.display = "inline";
    let rollNo, grade;
    rollNo = extract(rollNoInput).rollNo;
    grade = extract(rollNoInput).grade;
    logs = logs + rollNo.toString() + grade.toString();
    logs += extras ? "Y" : "N";
    let selected = document.querySelector(
                'input[name="subject"]:checked'
              );
    let newadd = "I";
    if(selected.value!="ICS") {
      if(selected.value=="PE") { newadd = "E"; } 
      if(selected.value=="PM") {newadd = "M";} 
    } 
    logs += newadd;
    log.innerHTML = logs;
    localStorage.setItem("roll", rollNoInput);
    let time = "Unavailable";
    if (grade == 2) {
      time = "9 AM to 12 PM";
    } else if (grade == 1) {
      time = "1 PM to 4 PM";
    }
    document.getElementById("time").innerHTML = "Exam Time: " + time;
    table.style.display = "table";
    other.style.display = "none";
    if (initialhtm == null) {
      initialhtm = table.innerHTML;
    }
    table.innerHTML = initialhtm;

    if (grade == 1) {
      let n = 0;
      for (let i = 0; i < fsubjects.length; i++) {
        if (fsubjects[i] != null) {
          if (mins[i] == 0 && extras) {
            let room = centers[i];
            let sub = fsubjects[i];
            let da, dat;
            for (let i = 0; i < firsubs.length; i++) {
              for (let j = 0; j < firsubs[i].length; j++) {
                if (firsubs[i][j] == sub) {
                  da = days[i].slice(0, 3);
                  dat = formatDate(dates[i]);
                  break;
                }
              }
            }
            n++;
            addRow(n, da, dat, sub, room, time);
          } else {
            if (rollNo >= mins[i] && rollNo <= maxes[i]) {
              let room = centers[i];
              let sub = fsubjects[i];
              let da, dat;

              let elig = false;
              let selected = document.querySelector(
                'input[name="subject"]:checked'
              );
              if (!extras) {
                if (selected.value == "ICS") {
                  for (let i = 0; i < ICSA1.length; i++) {
                    if (sub == ICSA1[i]) {
                      elig = true;
                    }
                  }
                } else if (selected.value == "PE") {
                  for (let i = 0; i < PEA1.length; i++) {
                    if (sub == PEA1[i]) {
                      elig = true;
                    }
                  }
                } else if (selected.value == "PM") {
                  for (let i = 0; i < PMA1.length; i++) {
                    if (sub == PMA1[i]) {
                      elig = true;
                    }
                  }
                }
                if (!elig) {
                  continue;
                }
              }
              for (let i = 0; i < firsubs.length; i++) {
                for (let j = 0; j < firsubs[i].length; j++) {
                  if (firsubs[i][j] == sub) {
                    da = days[i].slice(0, 3);
                    dat = formatDate(dates[i]);
                    break;
                  }
                }
              }
              n++;
              addRow(n, da, dat, sub, room, time);
            }
          }
        }
      }
    } else if (grade == 2) {
      let n = 0;
      for (let i = 0; i < ssubjects.length; i++) {
        if (ssubjects[i] != null) {
          if (mins[i] == 0 && extras) {
            let room = centers[i];
            let sub = ssubjects[i];
            let da, dat;
            for (let i = 0; i < secsubs.length; i++) {
              for (let j = 0; j < secsubs[i].length; j++) {
                if (secsubs[i][j] == sub) {
                  da = days[i].slice(0, 3);
                  dat = formatDate(dates[i]);
                  break;
                }
              }
            }
            n++;
            addRow(n, da, dat, sub, room, time);
          } else {
            if (rollNo >= mins[i] && rollNo <= maxes[i]) {
              let room = centers[i];
              let sub = ssubjects[i];
              let da, dat;
              let elig = false;
              let selected = document.querySelector(
                'input[name="subject"]:checked'
              );
              if (!extras) {
                if (selected.value == "ICS") {
                  for (let i = 0; i < ICSA2.length; i++) {
                    if (sub == ICSA2[i]) {
                      elig = true;
                    }
                  }
                } else if (selected.value == "PE") {
                  for (let i = 0; i < PEA2.length; i++) {
                    if (sub == PEA2[i]) {
                      elig = true;
                    }
                  }
                } else if (selected.value == "PM") {
                  for (let i = 0; i < PMA2.length; i++) {
                    if (sub == PMA2[i]) {
                      elig = true;
                    }
                  }
                }
                if (!elig) {
                  continue;
                }
              }
              for (let i = 0; i < secsubs.length; i++) {
                for (let j = 0; j < secsubs[i].length; j++) {
                  if (secsubs[i][j] == sub) {
                    da = days[i].slice(0, 3);
                    dat = formatDate(dates[i]);
                    break;
                  }
                }
              }
              n++;
              addRow(n, da, dat, sub, room, time);
            }
          }
        }
      }
    }
  }
}
function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [day, month] = inputDate.split("-");
  return `${day} ${months[parseInt(month) - 1]}`;
}
function addRow(number, day, date, subject, room, time) {
  const tableBody = document.querySelector("#scheduleTable tbody");
  const newRow = document.createElement("tr");

  const newCell1 = document.createElement("td");
  newCell1.textContent = number;
  newRow.appendChild(newCell1);

  const newCell2 = document.createElement("td");
  newCell2.textContent = day;
  newRow.appendChild(newCell2);

  const newCell3 = document.createElement("td");
  newCell3.textContent = date;
  newRow.appendChild(newCell3);

  const newCell4 = document.createElement("td");
  newCell4.textContent = subject;
  newRow.appendChild(newCell4);

  const newCell5 = document.createElement("td");
  newCell5.textContent = room;
  newRow.appendChild(newCell5);

  /*const newCell6 = document.createElement("td");
  newCell6.textContent = time;
  newRow.appendChild(newCell6);*/

  tableBody.appendChild(newRow);
}
