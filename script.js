const student1 = {
  name: "Ananya Sharma",
  course: "Full-Stack Web Development",
  marksObtained: 452,
  totalMarks: 500,
  age: 20
};

const student2 = {
  name: "Rohit Verma",
  course: "Data Structures & Algorithms",
  marksObtained: 268,
  totalMarks: 500,
  age: 21
};

const student3 = {
  name: "Meera Iyer",
  course: "UI/UX Design",
  marksObtained: 178,
  totalMarks: 500,
  age: 19
};

const student4 = {
  name: "Kabir Khan",
  course: "Full-Stack Web Development",
  marksObtained: 391,
  totalMarks: 500,
  age: 22
};

const student5 = {
  name: "Priya Nair",
  course: "Cloud Computing",
  marksObtained: 205,
  totalMarks: 500,
  age: 20
};

const student6 = {
  name: "Aditya Rao",
  course: "Data Structures & Algorithms",
  marksObtained: 435,
  totalMarks: 500,
  age: 21
};


const students = [student1, student2, student3, student4, student5, student6];


const PASS_THRESHOLD = 40;

function getGrade(percentage) {
  if (percentage >= 80) {
    return "A";
  } else if (percentage >= 60) {
    return "B";
  } else if (percentage >= 40) {
    return "C";
  } else {
    return "F";
  }
}

students.forEach(function (student) {
  const percentage = (student.marksObtained / student.totalMarks) * 100;
  const isPass = percentage >= PASS_THRESHOLD; 

  student.percentage = Math.round(percentage * 100) / 100; 
  student.result = isPass ? "Pass" : "Fail";
  student.grade = getGrade(percentage);
});

console.log("========== STUDENT REPORT ==========");
students.forEach(function (student, index) {
  console.log(
    `${index + 1}. ${student.name} | Total Marks: ${student.marksObtained}/${student.totalMarks} | ` +
    `Percentage: ${student.percentage}% | Result: ${student.result} | Grade: ${student.grade}`
  );
});
console.log("=====================================");

const totalStudents = students.length;

const uniqueCourses = [...new Set(students.map((s) => s.course))];
const totalCourses = uniqueCourses.length;

const sumPercentages = students.reduce((sum, s) => sum + s.percentage, 0);
const averagePercentage = Math.round((sumPercentages / totalStudents) * 100) / 100;

const passCount = students.filter((s) => s.result === "Pass").length;
const passPercentage = Math.round((passCount / totalStudents) * 100);

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("statTotalStudents").textContent = totalStudents;
  document.getElementById("statTotalCourses").textContent = totalCourses;
  document.getElementById("statAvgPercentage").textContent = averagePercentage + "%";
  document.getElementById("statPassPercentage").textContent = passPercentage + "%";
  document.getElementById("heroAverage").textContent = averagePercentage + "%";


  const tableBody = document.getElementById("studentTableBody");
  let rowsHTML = "";

  students.forEach(function (student) {
    const badgeClass = student.result === "Pass" ? "badge-pass" : "badge-fail";
    const gradeClass = "grade-" + student.grade;

    rowsHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>${student.marksObtained} / ${student.totalMarks}</td>
        <td class="pct-cell">${student.percentage}%</td>
        <td><span class="badge ${badgeClass}">${student.result}</span></td>
        <td><span class="grade-stamp ${gradeClass}">${student.grade}</span></td>
      </tr>`;
  });

  tableBody.innerHTML = rowsHTML;


  const courseChips = document.getElementById("courseChips");
  let chipsHTML = "";
  uniqueCourses.forEach(function (course) {
    chipsHTML += `<li>${course}</li>`;
  });
  courseChips.innerHTML = chipsHTML;

  const reportsPreview = document.getElementById("reportsPreview");
  let reportText = "";
  students.forEach(function (student, index) {
    reportText += `${index + 1}. ${student.name} — ${student.marksObtained}/${student.totalMarks} marks — ${student.percentage}% — ${student.result} — Grade ${student.grade}\n`;
  });
  reportsPreview.textContent = reportText.trim();


  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  navToggle.addEventListener("click", function () {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });


  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
});
