let dates, days;
let firsubs, secsubs;
let ranges, mins, maxes;
let fsubjects, ssubjects, centers;

function mapdata() {
  fsubjects = rem(markAsNull(datac[0], " II"));
  ssubjects = rem(datac[0].map((item, i) => (fsubjects[i] == null ? item : null)));
  ranges = datac[1];
  centers = datac[2];
  mins = ranges.map((range) => parseRange(range).min);
  maxes = ranges.map((range) => parseRange(range).max);
}

function mapschedule() {
  [dates, days, sec, fir] = schedule;
  secsubs = sec.map((item) => saparator(item, "II "));
  firsubs = fir.map((item) => saparator(item, "I "));
}

function saparator(input, delimiter) {
  return input
    .split(delimiter)
    .map((item) => item.trim().replace(/"/g, ""))
    .filter((item) => item !== "");
}

function parseRange(input) {
  if (input === "All Students") return { min: 0, max: 0 };
  const [min, max] = input.split("-").map((n) => parseInt(n, 10));
  return { min: min || NaN, max: max || NaN };
}

function markAsNull(arr, destroyer) {
  return arr.map((item) => (item && item.endsWith(destroyer) ? null : item));
}

function rem(arr) {
  return arr.map((item) =>
    item == null
      ? null
      : item.endsWith(" II")
      ? item.slice(0, -3)
      : item.endsWith(" I")
      ? item.slice(0, -2)
      : item
  );
}

function extract(inputString) {
  const [rollNo, grade] = inputString.split("-").map((n) => parseInt(n, 10));
  return rollNo && grade ? { rollNo, grade } : null;
}

function validate(inputs) {
  const errorMessageElement = document.getElementById("errorMessage");
  const table = document.getElementById("scheduleTable");
  errorMessageElement.textContent = "";

  if (!inputs.trim()) {
    errorMessageElement.textContent = "Input cannot be empty.";
    table.style.display = "none";
    return false;
  }

  if (/[a-zA-Z]/.test(inputs)) {
    errorMessageElement.textContent = "Input cannot contain alphabets.";
    table.style.display = "none";
    return false;
  }

  if (!/^\d{1,4}-\d{1,2}(-\d{2})?$/.test(inputs)) {
    errorMessageElement.textContent = 'Invalid format. Please enter in "XXXX-X-XX"';
    table.style.display = "none";
    return false;
  }

  const extracted = extract(inputs);
  if (!extracted || extracted.grade > 2 || extracted.grade < 1) {
    errorMessageElement.textContent = "You must be either 1st year or 2nd year";
    table.style.display = "none";
    return false;
  }

  errorMessageElement.textContent = "";
  return true;
}
