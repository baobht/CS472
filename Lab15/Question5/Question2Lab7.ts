class Student {
  studentId: number;
  answers: Question[];

  constructor(studentId: number) {
    this.studentId = studentId;
    this.answers = [];
  }

  addAnswer(question: Question): void {
    this.answers.push(question);
  }
}

class Question {
  qid: number;
  answer: string;

  constructor(qid: number, answer: string) {
    this.qid = qid;
    this.answer = answer;
  }

  checkAnswer(answer: string): boolean {
    return this.answer === answer;
  }
}

class Quiz {
  questions: Map<number, string>;
  students: Student[];

  constructor(questions: Question[], students: Student[]) {
    this.questions = new Map(questions.map((q) => [q.qid, q.answer]));
    this.students = students;
  }

  scoreStudentBySid(sid: number): number {
    let studentScore = 0;
    const student = this.students.find((stu) => stu.studentId === sid);
    if (!student) return 0;

    student.answers.forEach((question) => {
      const correctAnswer = this.questions.get(question.qid);
      if (correctAnswer && question.checkAnswer(correctAnswer)) {
        studentScore++;
      }
    });

    return studentScore;
  }

  getAverageScore(): number {
    const totalScore = this.students.reduce((sum, stu) => {
      return sum + this.scoreStudentBySid(stu.studentId);
    }, 0);
    return totalScore / this.students.length;
  }
}

const student1 = new Student(10);
student1.addAnswer(new Question(2, "a"));
student1.addAnswer(new Question(3, "b"));
student1.addAnswer(new Question(1, "b"));

const student2 = new Student(11);
student2.addAnswer(new Question(3, "b"));
student2.addAnswer(new Question(2, "a"));
student2.addAnswer(new Question(1, "d"));

const students: Student[] = [student1, student2];
const questions: Question[] = [
  new Question(1, "b"),
  new Question(2, "a"),
  new Question(3, "b"),
];

const quiz = new Quiz(questions, students);

let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10);

let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11);

let average = quiz.getAverageScore();
console.log(average);
