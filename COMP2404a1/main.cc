#include <iostream>
using namespace std;
#include <string>

#include "defs.h"
#include "Student.h"
#include "Storage.h"
#include "Course.h"

int  mainMenu();

int main()
{
  Storage storage;  // the location that saving all the student and courses
  int     stuId, courseCode, grade; //student id, course code, grade
  int     menuSelection;
  int     term;   // the that they take
  string  prof;   // course constucter
  int     numStu; // number of Student

  while (1) {
    menuSelection = mainMenu();

    if (menuSelection == 0)
      break;

    else if (menuSelection == 1) {
      // input 1 to adding student
      cout << "student id:   ";
      cin  >> stuId;
      Student* student = new Student(stuId);
      //saving it, since it pointer we have to new it
      numStu++;
      cout << "---------new student appear"<<endl;
      while (1) {
        cout << "course code <0 to end>:  ";
        cin  >> courseCode;
        if (courseCode == 0)
          break;
        cout << "grade:                   ";
        cin  >> grade;
        cout << "term:           ";
        cin >> term;
        cout << "Course instructor:             ";
        cin >> prof;
        //saving it, since it pointer we have to new it and add to student
        Course* course = new Course(courseCode,grade,term,prof);
        student->addCourse(course);
      }
      // addint to the storage
      storage.addStu(student);
    }
  }

  if ( numStu > 0)
    storage.print(); //if student eixsit, print the inforamtion

  return 0;
}

int mainMenu()
{
  int numOptions = 1;
  int selection  = -1;

  cout << endl;
  cout << "(1) Add student" << endl;
  cout << "(0) Exit" << endl;

  while (selection < 0 || selection > numOptions) {
    cout << "Enter your selection: ";
    cin  >> selection;
  }

  return selection;
}
