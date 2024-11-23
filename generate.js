let initialhtm;
document.addEventListener("DOMContentLoaded", function () {
  const roll = localStorage.getItem("roll");
  const xtra = localStorage.getItem("xtra");
  if (roll) document.getElementById("rollNoInput").value = roll;
  if (xtra === "yes") document.getElementById("extra").checked = true;
  history.pushState(null, null, location.href);
  window.addEventListener("popstate", () => {
    back();
    history.pushState(null, null, location.href);
  });
});
function download() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const rollNoInput = document.getElementById("rollNoInput").value || "Unknown";
    const time = document.getElementById("time").innerText || "Exam Time: Unavailable";

    doc.setFillColor(0, 0, 139);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(`Roll Number: ${rollNoInput}`, doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
    doc.text(time, doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });

    doc.autoTable({
        html: "#scheduleTable",
        startY: 40,
        styles: {
            textColor: [255, 255, 255],
            halign: "center",
            fillColor: [30, 30, 30],
        },
        headStyles: {
            fillColor: [50, 50, 50],
        },
        bodyStyles: {
            fillColor: [20, 20, 20],
        },
    });
    const finalY = doc.lastAutoTable.finalY;
    doc.text(document.getElementById("log").value , 105, finalY + 10, { align: "left" }); 
    doc.text("Genrated by MadSchedule. An app by Muhammad Ali. ", 105, finalY + 30, { align: "center" }); 
    doc.save(`${rollNoInput}_Schedule.pdf`);
}
window.onload = () => {
  const savedOption = localStorage.getItem("selectedSubject") || "ICS";
  document.querySelector(`input[name="subject"][value="${savedOption}"]`).checked = true;
};

document.querySelectorAll('input[name="subject"]').forEach((radio) =>
  radio.addEventListener("change", function () {
    localStorage.setItem("selectedSubject", this.value);
  })
);

const delay = (ms = 30) => new Promise((resolve) => setTimeout(resolve, ms));

function back() {
  document.getElementById("log").innerHTML = "";
  document.getElementById("scheduleTable").style.display = "none";
  document.getElementById("bb").style.display = "none";
  document.getElementById("down").style.display = "none";
  document.getElementById("rest").style.display = "inline";
  document.getElementById("time").innerHTML = "";
}
async function generateSchedule() {
  const inputElement = document.getElementById("rollNoInput");
  const table = document.getElementById("scheduleTable");
  const other = document.getElementById("rest");
  const bb = document.getElementById("bb");
  const extra = document.getElementById("extra");
  const log = document.getElementById("log");
  let rollNoInput = inputElement.value;
  let extras = extra.checked;
  let logs = "&nbsp&nbsp1.52.1vMS";
  localStorage.setItem("xtra", extra.checked ? "yes" : "no");
  if (validate(rollNoInput)) {
    bb.style.display = "inline";
    document.getElementById("down").style.display = "inline";
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
                  await delay(20);
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
                    await delay(20);
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
                  await delay(20);
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
                    await delay(20);
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
  newRow.classList.add("new-row"); // Initially invisible

  /*const newCell6 = document.createElement("td");
  newCell6.textContent = time;
  newRow.appendChild(newCell6);*/

  tableBody.appendChild(newRow);
  setTimeout(() => {
        newRow.classList.add("visible");
      }, 10);
                     }
