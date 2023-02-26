import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/student';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {
  student: BehaviorSubject<Student> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.studentService.getStudent(id !).subscribe((student) => {
      this.student.next(student);
    });
  }
}
