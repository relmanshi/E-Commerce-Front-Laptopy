import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { ContactUs } from 'src/app/Dtos/ContactUs/ContactUs';
import { ContactUsService } from 'src/app/services/ContactUs/contact-us.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent {
  constructor( private contactUs:ContactUsService,private toastr: ToastrService) {}

  form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    message: new FormControl<string>('', Validators.required),
  });

  onSubmit() {
    console.log(this.form);
    var contactUsDto= new ContactUs();
    contactUsDto.name=this.form.value.name as string;
    contactUsDto.email=this.form.value.email as string;
    contactUsDto.message=this.form.value.message as string;
    this.contactUs.sendMessage(contactUsDto).subscribe(
      {
        next:(data)=>{
            console.log(data);
            var test:any = data
            this.toastr.success(test.message , 'Success',{
              timeOut: 2000,} );
  
        }
      }
    )
  }
}
