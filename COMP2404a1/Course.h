#ifndef COURSE_H
#define COURSE_H

class Course
{
  public:
    Course(int=0,int=0,int=000000, string=""); //using default constucter  initializes value
    void print();

  private:
    int term; //year YYYYTT YYYY:year TT:10 for winter, 20 for summer, and 30 for fall
    string prof;  //course instructor
    int code;	// course code, for example 2404 for COMP2404
    int grade;	// numeric grade from 0 (F) to 12 (A+), with -1 for WDN
    string getGradeStr();
};

#endif
