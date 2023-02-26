import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url = 'http://localhost:5200';
  private students$: Subject<Student[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshStudents() {
    this.httpClient.get<Student[]>(`${this.url}/students`)
      .subscribe(students => {
        this.students$.next(students);
      });
  }

  getStudents(): Subject<Student[]> {
    this.refreshStudents();
    return this.students$;
  }

  getStudent(id: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.url}/students/${id}`);
  }

  createStudent(student: Student): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.url}/students`, student, { responseType: 'text', headers: headers });
  }

  updateStudent(id: string, student: Student): Observable<string> {
    return this.httpClient.put(`${this.url}/students/${id}`, student, { responseType: 'text' });
  }

  getStudentsFilter(filter: Student) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.get<Student[]>(`${this.url}/find/${filter}`, { headers: headers })
     .subscribe(students => {
        this.students$.next(students);
      });
      console.log(this.students$);
    return this.students$;
  }

}
