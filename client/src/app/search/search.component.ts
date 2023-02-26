import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Number } from 'mongoose';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Student } from '../student';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  initialState: BehaviorSubject<Student> = new BehaviorSubject({} as Student);

  @Output()
  formValuesChanged = new EventEmitter<Student>();

  @Output()
  formSubmitted = new EventEmitter<Student>();

  students$: Observable<Student[]> = new Observable();

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  private fetchStudents(): void {
    this.students$ = this.studentService.getStudents();
  }

  public displayTerm(student: Student) {
    if (student.term === "winter") {
       let term:String = "Wintersemester";
       return term;
    }
    else if (student.term === "summer") {
      let term:String = "Sommersemester";
      return term;
    }
    else {
      let term:String="";
      return term;
     };
  }

  findStudents(filter: Student) {
    console.log(this.studentService.getStudentsFilter(filter.valueOf()));
    this.students$ = this.studentService.getStudentsFilter(filter.valueOf());
    //this.studentService.getStudentsFilter(filter).subscribe(students$ => students$);
    console.log("returned value"+this.students$);
    return this.students$;

  }

}
