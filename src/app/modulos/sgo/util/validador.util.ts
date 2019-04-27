// Clase la cual contiene validadores de texto, rut, oc
export class ValidadorDatos {


  // Metodo con el cual valido si un Rut devuelve un true o false
  // Refinar el metodo
  validarRut(rutFull: String) {
    rutFull = rutFull.replace('.', '');
    rutFull = rutFull.replace('.', '');
    const rut = rutFull.split('-');
    const cuerpoIn = rut[0];
    let dvIn = rut[1];
    let suma: any;
    let multiplo: any;
    let i: any;
    let index: any;
    let valor: any;
    let dvEsperado: string;

    valor = cuerpoIn + '' + dvIn;

    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpoIn.length < 7) {

      return false;
    }

    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;

    for (i = 1; i <= cuerpoIn.length; i++) {
      index = multiplo * valor.charAt(cuerpoIn.length - i);
      suma = suma + index;
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11) + '';

    // Casos Especiales (0 y K)
    dvIn = dvIn === 'K' ? '10' : dvIn;
    dvIn = dvIn === '0' ? '11' : dvIn;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado !== dvIn) {
      return false;
    }
    return true;
  }


  // Metodo con el cual valido que una OC tenga la estructura correcta

  validationOc(oc: any) {
    // Constante con la expresion regular para validar una orden de compra
  const EXPRESSION_REGULAR_OC = /^[0-9]{1,20}([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?([,][0-9]{1,20})?$/;

    const FACTOR_REGEXP = EXPRESSION_REGULAR_OC;
    if (FACTOR_REGEXP.test(oc)) {
      return true;
    }  return false;
  } 

 


}
