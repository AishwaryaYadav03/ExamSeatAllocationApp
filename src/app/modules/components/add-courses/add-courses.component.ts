import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent implements OnInit{

  constructor(private service:AdminService,private formBuilder:FormBuilder,private toast:ToastrService){}
  courses: any[] = [];
  form  = new FormGroup({
    courseName: new FormControl(''),
  });

  ngOnInit(): void {

    this.fetchCourses()
    this.form = this.formBuilder.group({
      courseName: ["", [Validators.required]],
    
      
     
    });

  }

  fetchCourses(): void {
    this.service.getCourses().subscribe(
      (response) => {
        console.log(response);
        
        this.courses = response; // Assign fetched data to the courses array
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  deleteCourse(courseId: number): void {
    console.log(`Deleting course with ID: ${courseId}`);
  
    this.service.deleteCourses(courseId).subscribe(
      (response) => {
        console.log('Course deleted successfully:', response);
        // Update the local list by filtering out the deleted course
        this.courses = this.courses.filter(course => course.courseId !== courseId);
      },
      (error) => {
        console.error('Error deleting course:', error.message);
        console.error('Error details:', error);
      }
    );
  }
  
  

  formSubmit() {
    if (this.form.valid) {
      this.service.addCourses(this.form.value).subscribe(
        (res) => {
          console.log('Course added successfully:', res);
          
          // Assuming 'res' contains the newly added course
          // You can push the new course into the courses array directly
          this.courses.push(res);  // Add the new course to the list
          
          // Optionally, display a success message using toastr
          this.toast.success('Course added successfully!', 'Course Added');
          
          // Reset the form after submission
          this.form.reset();
        },
        (error) => {
          console.error('Error adding course:', error);
          this.toast.error('Error adding course', 'Failed!');
        }
      );
    }
  }
  

}
