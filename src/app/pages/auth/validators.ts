import { AbstractControl } from "@angular/forms";

export function paswordsConfirmation(control:AbstractControl){
    let password=control.get('password');
    let confirmPassword=control.get('confirmPassword');
    console.log(password?.value,confirmPassword?.value)

   if(password?.value!==confirmPassword?.value){
    return null// {pas:fatle}

    control.get('confirmPassword')?.setErrors({passwordMatch: true })
   }
   else {
    // control.get('confirmPassword')?.setErrors(null);
    return null

  }
  
}