import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrl: './add-block.component.css'
})
export class AddBlockComponent {

  constructor(private service:AdminService,private formBuilder:FormBuilder,private toast:ToastrService){}

  form  = new FormGroup({
    blockNumber: new FormControl(''),
    capacity: new FormControl(''),
    

  });

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      blockNumber: ["", [Validators.required]],
      capacity: ["", [Validators.required]],
      
     
    });

  }

  formSubmit() {
    // alert(JSON.stringify(this.form.value));

    if (this.form.value) {
      this.service.addBlock(this.form.value).subscribe(res => {
        console.log(res);
        
        this.toast.success('Product added successfully:', 'Product Added');
        this.form.reset();
        // this.router.navigate(['/admin-dashboard/add-purchase']);
      }, error => {
        this.toast.error('Error adding product:', "Failed!");
      });
    }
  }

}
