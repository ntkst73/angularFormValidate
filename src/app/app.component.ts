import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  form: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',
        [
          Validators.email,
          Validators.required,
          MyValidators.restrictedEmail
        ], [MyValidators.uniqEmail]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      adress: new FormGroup({
        country: new FormControl('ru'),
        city: new FormControl('', Validators.required)
      }),
      skills: new FormArray([])
    })
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', this.form)
      const formData = {...this.form.value}

      console.log('formData: ', formData)
      this.form.reset()
    }
  }

  setCapital() {
    const cityMap = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    }
    const cityKey = this.form.get('adress').get('country').value
    const city = cityMap[cityKey]

    this.form.patchValue({adress: {city}})
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    (this.form.get('skills') as FormArray).push(control)
  }
}
