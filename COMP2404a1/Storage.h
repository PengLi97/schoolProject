#ifndef STORAGE_H
#define STORAGE_H

#include "Student.h"
#include "defs.h"

class Storage
{
  public:
    Storage();  //initializes the student pointer
    ~Storage(); //destrctor construction
    void addStu(Student*); //adding student in array pointer
    void print();

  private:
    Student* student[MAX_NUM_STU]; //array pointer for saving student
    int numStudent; //the number of student in the array
};

#endif
