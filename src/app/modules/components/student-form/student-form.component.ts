import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit{

  constructor(private formBuilder:FormBuilder,private service:AdminService,private toast:ToastrService){}
  courses: any[] = [];
  form  = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    prnNumber: new FormControl(''),
    studentClass: new FormControl(''),
    semester:new FormControl(''),
    gender:new FormControl(''),
    mobileNumber: new FormControl(''),
    rollNumber: new FormControl(''),
  });

  ngOnInit(): void {

    this.fetchCourses()

    this.form = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      prnNumber: ["", [Validators.required]],
      studentClass: ["", [Validators.required]],
      semester: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      mobileNumber: ["", [Validators.required]],
      rollNumber: ["", [Validators.required]]
    });

  }

  student: any = {
    firstName: "",
    lastName: "",
    prnNumber: "",
    semester: "",
    gender: "",
    mobileNumber: "",
    rollNumber: "",
    course: {
      courseId: 0
    }
  }


  fetchCourses(): void {
    this.service.getCourses().subscribe(
      (data: any[]) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses', error);
      }
    );
  }


  formSubmit() {
    // alert(JSON.stringify(this.form.value));
    this.student.firstName = this.form.get("firstName")?.value
    this.student.lastName = this.form.get("lastName")?.value
    this.student.prnNumber = this.form.get("prnNumber")?.value
    this.student.semester = this.form.get("semester")?.value
    this.student.gender = this.form.get("gender")?.value
    this.student.mobileNumber = this.form.get("mobileNumber")?.value
    this.student.rollNumber = this.form.get("rollNumber")?.value
    this.student.course.courseId = this.form.get("studentClass")?.value

  
    if (this.form.value) {
      this.service.addStudent(this.student).subscribe(res => {
        this.form.reset();
        
        this.toast.success('Product added successfully:', 'Product Added');
        this.form.reset();
        // this.router.navigate(['/admin-dashboard/add-purchase']);
      }, error => {
        this.toast.error('Error adding product:', "Failed!");
      });
    }
  }

}
