import { Injectable } from '@angular/core';

@Injectable()
export class UtilServiceService {

  public regexMail = '^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$';
  public regexNumerico = '^[0-9]*$';
  public regexNoCaracteresEspeciales = '^[0-9a-zA-Z-Ñ-ñ]*$';
  public regexNoCaracteresEspeciales2 = '^[0-9a-zA-Z ]*$';
  public regexNoCaracteresEspecialesWithSpace = '^[0-9a-zA-Z-Ñ-ñ ]*$';

}
