const student = {
    firstName: "John",
    lastName: "Doe",
    grades: [],
    inputNewGrade(newGrade) {
      this.grades.push(newGrade);
    },
    computeAverageGrade() {
      const sum = this.grades.reduce((a, b) => a + b, 0);
      return this.grades.length ? sum / this.grades.length : 0;
    }
  };
  
  student.inputNewGrade(90);
  student.inputNewGrade(80);
  console.log(student.computeAverageGrade()); // Output: 85
  
  const students = [
    Object.create(student),
    Object.create(student)
  ];
  
  students[0].firstName = "Alice";
  students[0].lastName = "Smith";
  students[0].grades = [70, 80];
  
  students[1].firstName = "Bob";
  students[1].lastName = "Brown";
  students[1].grades = [90, 100];
  
  const totalGrades = students.flatMap(s => s.grades);
  const overallAvg = totalGrades.reduce((a, b) => a + b, 0) / totalGrades.length;
  console.log("Overall average:", overallAvg); // Output: 85
  