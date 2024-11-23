let dates, days, firsubs, secsubs, ranges, mins, maxes, fsubjects, ssubjects, centers;
let ICS1 = "I Comp. Sc. I English I Math I Isl Std. I Urdu I Physics I Al Quran";
let PE1 = "I Chem I English I Math I Isl Std. I Urdu I Physics I Al Quran";
let PM1 = "I Chem I English I Biology I Isl Std. I Urdu I Physics I Al Quran";
let ICS2 = "II Comp. Sc. II English II Math II Pak. St. II Urdu II Physics II Al Quran";
let PE2 = "II Chem II English II Math II Pak. St. II Urdu II Physics II Al Quran";
let PM2 = "II Chem II English II Biology II Pak. St. II Urdu II Physics II Al Quran";
let ICSA1, ICSA2, PEA1, PEA2, PMA1, PMA2;

function mapdata() {
  fsubjects = rem(markAsNull(datac[0], " II"));
  ssubjects = rem(datac[0].map((x, i) => (fsubjects[i] == null ? x : null)));
  ranges = datac[1];
  centers = datac[2];
  mins = ranges.map((r) => parseRange(r).min);
  maxes = ranges.map((r) => parseRange(r).max);
}

function mapschedule() {
  dates = schedule[0];
  days = schedule[1];
  secsubs = schedule[2].map((x) => saparator(x, "II "));
  firsubs = schedule[3].map((x) => saparator(x, "I "));
  ICSA1 = saparator(ICS1, "I ");
  PEA1 = saparator(PE1, "I ");
  PMA1 = saparator(PM1, "I ");
  ICSA2 = saparator(ICS2, "II ");
  PEA2 = saparator(PE2, "II ");
  PMA2 = saparator(PM2, "II ");
}

function saparator(input, delimiter) {
  return input.split(delimiter).map((x) => x.trim().replace(/"/g, "")).filter((x) => x);
}

function parseRange(input) {
  if (input === "All Students") return { min: 0, max: 0 };
  let [min, max] = input.split("-").map(Number);
  return { min, max };
}

function markAsNull(arr, destroyer) {
  return arr.map((x) => (x && x.endsWith(destroyer) ? null : x));
}

function rem(arr) {
  return arr.map((x) => (x ? x.replace(/ (II|I)$/, "") : null));
}

function extract(input) {
  let [rollNo, grade] = input.split("-").map(Number);
  return rollNo && grade ? { rollNo, grade } : null;
}

function validate(input) {
  let err = document.getElementById("errorMessage");
  let table = document.getElementById("scheduleTable");
  err.textContent = "";
  table.style.display = "none";

  if (!input.trim()) return (err.textContent = "Input cannot be empty.", false);
  if (/[a-zA-Z]/.test(input)) return (err.textContent = "Input cannot contain alphabets.", false);
  if (!/^\d{1,4}-\d{1,2}(-\d{2})?$/.test(input)) return (err.textContent = 'Invalid format. Please enter in "XXXX-X-XX"', false);
  if (extract(input)?.grade > 2 || extract(input)?.grade < 1) return (err.textContent = "You must be either 1st year or 2nd year", false);
  return true;
}
