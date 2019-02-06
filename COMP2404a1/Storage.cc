#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

#include "Storage.h"

Storage::Storage(){
  numStudent = 0;
}

Storage::~Storage(){
  for(int i = 0; i < numStudent; i++)
    delete(student[i]);
}

void Storage::addStu(Student* s){
  numStudent++;
  student[numStudent-1] = s;
}

void Storage::print(){
  cout << "\n--------The list of student in storage------"<<endl;
  for(int i = 0; i < numStudent; i++){
    cout << i+1 << ". ";
    student[i]->print();
  }
}
