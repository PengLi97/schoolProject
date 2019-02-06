#ifndef STUDENT_H
#define STUDENT_H

#include "defs.h"
#include "Course.h"

class Student
{
  public:
    Student(int=0);
    ~Student(); //destrctor construction
    void addCourse(Course*);  //adding couse to the array
    void print();

  private:
    int    id;
    Course* courses[MAX_NUM_COURSES];  //array pointer saving the courses
    int    numCourses; //the number of course that in the array
};

#endif
