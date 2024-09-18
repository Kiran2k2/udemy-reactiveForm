import { afterNextRender, Component, DestroyRef, inject, OnInit, viewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
console.log(window);

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  private destroyRef=inject(DestroyRef)
form=new FormGroup({
  email:new FormControl('',{
    validators:[Validators.email,Validators.required]
  }),
  password:new FormControl('',{
    validators:[Validators.required,Validators.maxLength(6)]
  })
});
get EmailValid(){
  return(
    this.form.controls.email.touched&&
    this.form.controls.email.dirty&&
    this.form.controls.email.invalid
  );
}
get passwordValid(){
  return(
    this.form.controls.password.touched&&
    this.form.controls.password.dirty&&
    this.form.controls.password.invalid
  );
}
ngOnInit(){

const savedForm=window.localStorage.getItem('saved-login-data')
if(savedForm){
  const loadedForm=JSON.parse(savedForm)
  this.form.patchValue({
    email:loadedForm.email
  })
}


 const subscription= this.form.valueChanges.pipe(debounceTime(500)).subscribe({
    next :value=>{
    window.localStorage.setItem('saved-login-data',JSON.stringify({email:value.email }))
    }
  });
  this.destroyRef.onDestroy(()=> subscription.unsubscribe())
  
  
}



onSubmit(){
  console.log(this.form);
}


}
