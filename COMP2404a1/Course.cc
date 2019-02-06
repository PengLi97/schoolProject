#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

#include "Course.h"
//initializes the courses
Course::Course(int c,int g, int t, string p)
{
  code = c;
  grade = g;
  term  = t;
  prof = p;
}

void Course::print()
{
  //print the year, course instructor and grade
  cout << "-- term: " << term << " "
       << "Course Instructor: " << prof << "  "
       << "Grade: " << getGradeStr() << endl;

}

string Course::getGradeStr()
{
  string gradeStrings[] = {
    "WDN", "F", "D-", "D", "D+", "C-", "C", "C+",
    "B-", "B", "B+", "A-", "A", "A+" };

  if ( grade >= -1 && grade <= 12 )
    return gradeStrings[grade+1];
  else
    return "Unknown";
}
