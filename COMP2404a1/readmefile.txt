Peng Li 101047123
Date: 2019 Jan 31th

purpose:
    Storage store all the student and course in it, and print it with nice formate
  and there is no memory leak in the memory.
source:
Course.cc	Makefile	in.txt  Course.h	Storage.cc	Student.cc	in2.txt
Storage.h	Student.h	defs.h  main.cc

compile:
  "tar -xvf Assigment1_PengLi" unzip the file
  "make clean" make sure it is clean
  "make" compile all the class
  "./a1<in.txt" to check for the all output(ignore in2.txt it just a test file)
  "valgrind ./a1<in.txt" to check the memory is leak or not.
