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
  const rollNoInput = document.getElementById("rollNoInput").value;
  const extra = document.getElementById("extra").checked;
  const selected = document.querySelector('input[name="subject"]:checked');
  const log = document.getElementById("log");
  const bb = document.getElementById("bb");
  const table = document.getElementById("scheduleTable");
  const other = document.getElementById("rest");
  const extras = extra ? "Y" : "N";
  const newadd = selected.value === "PE" ? "E" : selected.value === "PM" ? "M" : "I";
  let logs = `&nbsp&nbsp1.51.1vMS${rollNoInput}${extras}${newadd}`;
  let time = "Unavailable";

  localStorage.setItem("xtra", extra ? "yes" : "no");
  localStorage.setItem("roll", rollNoInput);

  if (!validate(rollNoInput)) return;

  bb.style.display = "inline";
  document.getElementById("down").style.display = "inline"; 
  const { rollNo, grade } = extract(rollNoInput);
  logs += rollNo + grade;
  log.innerHTML = logs;

  time = grade === 2 ? "9 AM to 12 PM" : grade === 1 ? "1 PM to 4 PM" : time;
  document.getElementById("time").innerHTML = "Exam Time: " + time;

  table.style.display = "table";
  other.style.display = "none";
  if (!initialhtm) initialhtm = table.innerHTML;
  table.innerHTML = initialhtm;

  const subjects = grade === 1 ? fsubjects : ssubjects;
  const subsList = grade === 1 ? firsubs : secsubs;
  const elSubjects = grade === 1 ? { ICS: ICSA1, PE: PEA1, PM: PMA1 } : { ICS: ICSA2, PE: PEA2, PM: PMA2 };
  let n = 0;

  for (let i = 0; i < subjects.length; i++) {
    if (!subjects[i]) continue;

    const room = centers[i];
    const sub = subjects[i];
    let elig = extras || elSubjects[selected.value].includes(sub);

    if (!elig && rollNo < mins[i] || rollNo > maxes[i]) continue;

    let da, dat;
    for (let j = 0; j < subsList.length; j++) {
      if (subsList[j].includes(sub)) {
        da = days[j].slice(0, 3);
        dat = formatDate(dates[j]);
        await delay();
        break;
      }
    }
    addRow(++n, da, dat, sub, room, time);
  }
}

function formatDate(inputDate) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [day, month] = inputDate.split("-");
  return `${day} ${months[parseInt(month) - 1]}`;
}

function addRow(number, day, date, subject, room, time) {
  const tableBody = document.querySelector("#scheduleTable tbody");
  const newRow = document.createElement("tr");
  newRow.innerHTML = `<td>${number}</td><td>${day}</td><td>${date}</td><td>${subject}</td><td>${room}</td>`;
  newRow.classList.add("new-row");
  tableBody.appendChild(newRow);
  setTimeout(() => newRow.classList.add("visible"), 10);
}
