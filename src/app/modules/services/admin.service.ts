import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/services/helper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  public addStudent(data: any): Observable<any> {
    return this.http.post(BASE_URL + "/student/add-student", data);
  }

  public addBlock(data: any): Observable<any> {
    return this.http.post(BASE_URL + "/block/add-block", data);
  }

  public addCourses(data: any): Observable<any> {
    return this.http.post(BASE_URL + "/course/add-course", data);
  }

  public getCourses(): Observable<any> {
    return this.http.get(BASE_URL + "/course/get-courses");
}

// public deleteCourses(courseId:any): Observable<any> {
//   return this.http.delete(BASE_URL + "/course/delete-course",courseId);
// }

public deleteCourses(courseId: number): Observable<any> {
  const url = `${BASE_URL}/course/delete-course?courseId=${courseId}`;
  return this.http.delete(url, { responseType: 'text' });
}


// ----------------- ALL BLOCKS SERVICES -------------------

public getAllBlocks():Observable<any> {
  return this.http.get(BASE_URL + "/block/get-blocks");
}

}
