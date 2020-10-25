import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

validations_form: FormGroup;
validation_messages = {
  'DNI': [
  { type: 'required', message: 'DNI es requerido' },
  { type: 'minlength', message: 'DNI debe tener 9 caracteres' },
  { type: 'maxlength', message: 'DNI debe tener 9 caracteres' },
  { type: 'pattern', message: 'DNI debe tener el patrón correspondiente' },
  { type: 'validDNI', message: 'DNI es invalido' },
  ],
  'IBAN': [
  { type: 'required', message: 'IBAN es requerido' },
  { type: 'minlength', message: 'IBAN debe tener 24 caracteres' },
  { type: 'maxlength', message: 'IBAN debe tener 24 caracteres' },
  { type: 'pattern', message: 'Introduce un IBAN válido' }
  ],
  };

constructor(
public formBuilder: FormBuilder,
private navCtrl: NavController
) { }

ngOnInit() {
  /*La expresión regular de validación de la clave consta de estas partes:
(?=.{8,})  comprueba que al menos tiene 8 caracteres
(?=.*[a-z]) comprueba que contiene al menos una minúscula
(?=.*[A-Z]) comprueba que contiene al menos una mayúscula
(?=.*[0-9]) comprueba que contiene al menos un dígito
(?=.*[.,-]).*$')  comprueba que contiene al menos uno de estos tres
                         caracteres: . , -
.*        captura toda la cadena si se cumplen las anteriores condiciones
*/

this.validations_form = this.formBuilder.group({
  DNI: new FormControl('', Validators.compose([
    this.validDNI,
    Validators.maxLength(9),
    Validators.minLength(9),
    Validators.pattern('[0-9]{8,8}[A-Za-z]'),
    Validators.required
    ])),
IBAN: new FormControl('', Validators.compose([
  Validators.maxLength(24),
  Validators.minLength(24),
Validators.pattern('ES[0-9]{22}'),
Validators.required
]))
});
}

/*Al pulsar el botón submit se llama a este método que recibe como parámetro todos los valores introducidos en el formulario.
Para pasar estos valores a la siguiente página se crea un objeto de la clase NavigationExtras.
Este objeto es un array asociativo donde definimos un campo queryParams, que a su vez es otro array asociativo.
Dentro de queryParams creamos una pareja clave-valor para cada parámetro que queramos pasar a la otra página
El valor asociado a 'user' es un objeto. Siempre que queramos pasar un objeto como parámetro tenemos que pasarlo a JSON.
*/
onSubmit(values){
console.log(values);
let navigationExtras: NavigationExtras = {
queryParams: {
user: JSON.stringify(values),
numero: 3
}
};
this.navCtrl.navigateForward('/user', navigationExtras);
}

validDNI = function (fc: FormControl) {
  var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
  var numeros = fc.value.substring(0,fc.value.length-1);
  var numero = numeros % 23;
  var letraCorr = letras.charAt(numero);
  var letra = fc.value.substring(8,9);
  if (letraCorr != letra) {
    return ({ validDNI: true });
  } else {
    return (null);
  }
}

}//end_class
