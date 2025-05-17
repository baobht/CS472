function describePerson(person: { name: string; age: number; isStudent: boolean }): string {
  const studentStatus = person.isStudent ? "a student" : "not a student";
  return `${person.name} is ${person.age} years old and is ${studentStatus}.`;
}

console.log(describePerson({ name: "Alice", age: 25, isStudent: true }));
