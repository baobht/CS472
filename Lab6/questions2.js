function Student(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.grades = [];
}

Student.prototype.inputNewGrade = function (newGrade) {
  this.grades.push(newGrade);
};

Student.prototype.computeAverageGrade = function () {
  const sum = this.grades.reduce((a, b) => a + b, 0);
  return this.grades.length ? sum / this.grades.length : 0;
};

const s1 = new Student("Alice", "Smith");
s1.inputNewGrade(75);
s1.inputNewGrade(85);

const s2 = new Student("Bob", "Brown");
s2.inputNewGrade(90);
s2.inputNewGrade(80);

const studentArray = [s1, s2];
const allGrades = studentArray.flatMap(s => s.grades);
const avg = allGrades.reduce((a, b) => a + b, 0) / allGrades.length;
console.log("Constructor average:", avg); // Output: 82.5
