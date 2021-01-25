import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class MyValidators{
  static restrictedEmail(control: FormControl): {[key: string]: boolean} {
    if (['sveta@mail.ru','nikita@.ru'].includes(control.value)) {
      return {
        restrictedEmail: true
      }
    }
    return null
  }

  static uniqEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if(control.value === 'async@email.ru') {
            resolve({uniqEmail: true})
        } else {
          return(null)
        }
      },1000)
    })
  }
}
