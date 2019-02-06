#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

#include "Student.h"

Student::Student(int i)
{
  id = i;
  numCourses = 0;
}
Student::~Student(){
  for(int i = 0; i < numCourses; i++)
    delete(courses[i]);
}

void Student::addCourse(Course* c){
  numCourses++;
  courses[numCourses-1] = c; //saving the course in array pointer
}

void Student::print()
{
  cout<< endl << "Id: " << id << endl;

  for(int i = 0; i < numCourses; i++){
    courses[i]->print();
  }
}
