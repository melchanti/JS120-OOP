function createStudent(name, year) {
  return {
    year : year,
    name : name,
    courses: [],

    info: function() {
      console.log (`${this.student} is a ${this.year} year student.`)
    },

    addCourse: function(currentCourse) {
      this.courses.push(currentCourse);
    },

    listCourses: function() {
      console.log(this.courses);
    },

    addNote: function(courseCode, currentNote) {
      this.courses.forEach(course => {
        if (course.code === courseCode) {
          if (course.hasOwnProperty('note')) {
            course.note += `; ${currentNote}`;
          } else {
            course.note = currentNote;
          }
        }
      });
    },

    addGrade: function(courseCode, currentGrade) {
      this.courses.forEach(course => {
        if (course.code === courseCode) {
          course.grade = currentGrade;
        }
      });
    },

    updateNote: function(courseCode, currentNote) {
      this.courses.forEach(course => {
        if (course.code === courseCode) {
          course.note = currentNote;
        }
      });
    },

    viewNotes: function() {
      this.courses.forEach(course => {
        if (course.hasOwnProperty('note')) {
          console.log (`${course.name}: ${course.note}`);
        }
      });
    },

    toString: function() {
      console.log (`{
        name: ${this.name},
        year: ${this.year},
        courses: ${this.courses}
      }`);
    },
  }
}

function createSchool() {
  return {
    students: [],
    courses: {},

    addStudent: function(name, year) {
      const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];

      if (!VALID_YEARS.includes(year)) {
        console.log ('Invalid Year');
        return;
      }

      let student = createStudent(name, year);
      this.students.push(student);

      return student;
    },

    enrollStudent: function(student, course) {
      if (Object.keys(this.courses).includes(course.name)) {
        this.courses[course.name].students.push(student);
      } else {
        this.courses[course.name] = course;
        course.students = [student];
      }

      student.addCourse(course);
    },

    addGrade: function(student, courseCode, grade) {
      student.addGrade(courseCode, grade);
    },

    getReportCard: function(student) {
      student.courses.forEach(course => {
        if (course.hasOwnProperty('grade')) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    courseReport: function (courseName) {
      console.log (`= ${courseName} grades=`);
      let courseGrades = [];

      if (this.courses[courseName]) {
        this.courses[courseName]['students'].forEach(student => {
          student.courses.forEach(course => {
            if (course.name === courseName) {
              console.log (`${student.name}: ${course.grade}`);
              courseGrades.push(course.grade);
            }
          });
        });
      }

      console.log('---');
      
      let average;
      if (courseGrades.length > 0) {
        let gradesSum = courseGrades.reduce((accum, grade) => {
          return accum += grade;
        }, 0);
        
        average = gradesSum / courseGrades.length;
      } else {
        average = undefined;
      }

      console.log (`Course Average: ${average}`);
    },
  }
}

let school = createSchool();

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, {name: 'Math', code: 101});
school.enrollStudent(foo, {name: 'Advanced Math', code: 102});
school.enrollStudent(foo, {name: 'Physics', code: 202});
school.addGrade (foo, 101, 95);
school.addGrade(foo, 102, 90);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, {name: 'Math', code: 101});
school.addGrade(bar, 101, 91);

let qux = school.addStudent ('qux', '2nd');
school.enrollStudent(qux, {name: 'Math', code: 101});
school.enrollStudent(qux, {name: 'Advanced Math', code: 102});
school.addGrade(qux, 101, 93);
school.addGrade(qux, 102, 90);
//school.getReportCard(foo);
school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');
