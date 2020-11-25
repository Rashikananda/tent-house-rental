import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-transc',
  templateUrl: './add-transc.component.html',
  styleUrls: ['./add-transc.component.scss']
})
export class AddTranscComponent implements OnInit {
  addTransc: FormGroup;
  matcher = new MyErrorStateMatcher();
  customer_id : string = '';
  product_id : string = '';
  transation_type : string = '';
  quantity : number = 0;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder,
    private apiServicce: ApiService,private dialogRef: MatDialogRef<AddTranscComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this)
    this.addTransc = this.formBuilder.group({
      'customer_id' : [null, Validators.required],
      'product_id' : [null, Validators.required],
      'transation_type' : [null, Validators.required],
      'quantity' : [null, [Validators.required,Validators.min(1), 
        (control: AbstractControl) => {
          // return true
          if(control.parent && control.value){
            let product_id = control.parent.value.product_id;
            console.log(product_id)
            if(product_id) {
              const product = this.data.summaryReport.find((s: any) =>  s.product_id === product_id)
              console.log(product)
              const type = control.parent?.value?.transation_type;
              console.log(type);
              if (type == 'OUT' ) {
                return control.value <= (product['Available Quantity'] || 1) ? null : {
                  custom: { message: 'You can enter below ' + product['Available Quantity'] +  ' Quantity.' } }
              } else {
                return control.value <= (product['quantity_booked'] || 1) ? null : {
                  custom: { message: 'You can enter below ' + product['Available Quantity'] +  ' Quantity.' }
              }
              
            }
            }
          }
            return null;
        }]]
    });
   }



  ngOnInit(): void {

  }
  onFormSubmit(form:NgForm) {
    console.log(form)
    this.dialogRef.close(form)
    // this.api.postBook(form)
    //   .subscribe(res => {
    //       let id = res['_id'];
    //       this.router.navigate(['/book-details', id]);
    //     }, (err) => {
    //       console.log(err);
    //     });
  }

}
