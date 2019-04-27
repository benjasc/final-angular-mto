import { Component, OnInit, ViewChild } from '@angular/core';
import { Utils } from './../../../shared/utils/utils';
import { Perfil } from './../../../mantenedores/vo/perfil';
import { AreaService } from '../../services/area.service';
import { IMyDateModel } from 'mydatepicker';
import { GLOBAL } from './../../../shared/services/global';
import { MessageService } from './../../../shared/services/message.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { Globals } from './../../../shared/utils/globals';
import { Usuario } from './../../../shared/vo/usuario';
import { Area } from './../../../shared/vo/area';
import { MenuProfile } from './../../../shared/vo/menu';
import { LogService } from './../../../shared/services/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintainer-area',
  templateUrl: './maintainer-area.component.html',
  styleUrls: ['./maintainer-area.component.scss']
})
export class MaintainerAreaComponent implements OnInit {
  private menu: MenuProfile[];
  private usuario: Usuario;
  resultadoBusquedaArea: Area[] = [];
  private config: any;
  ret: any;
  results: any;
  resultUpdate: any;
  resultsDetail: any;
  resultValid: any;
  resultInsert: any;
  resultDelete: any;
  utils: Utils;
  editable: Boolean;
  cadena: number;
  url: String;

  myModalInsertInputNameArea: any;
  idAreaProfileDeleteMyModal: any;

  @ViewChild('myModalInsert') myModalInsert;
  @ViewChild('myModalUpdate') myModalUpdate;
  @ViewChild('myModalDelete') myModalDelete;

  constructor(
    public areaService: AreaService,
    public messageService: MessageService,
    public dialogService: DialogService,
    public globals: Globals,
    public logService: LogService,
    public router: Router
  ) {
    this.config = this.globals.getValue();
    this.utils = new Utils(
      this.messageService,
      this.router,
      this.dialogService
    );
    this.cadena = Number(sessionStorage.getItem('cadena'));
    console.log(this.cadena);
  }

  ngOnInit() {

    // usuario
    this.usuario = this.config[1].val;
    // menu
    this.menu = this.config[2].val;

    // url
    this.url = this.router.url;

    for (let i = 0; i < this.menu.length; i++) {
      for (let j = 0; j < this.menu[i].subItems.length; j++) {
        console.log(
          'Access Menu: ' +
            this.menu[i].idAccess +
            ' / ' +
            this.menu[i].idModule +
            ' / ' +
            this.menu[i].name +
            ' / ' +
            this.menu[i].url
        );

        console.log(
          'Access SubMenu: ' +
            this.menu[i].subItems[j].idAccess +
            ' / ' +
            this.menu[i].subItems[j].idModule +
            ' / ' +
            this.menu[i].subItems[j].name +
            ' / ' +
            ' / ' +
            this.menu[i].subItems[j].url
        );

        if (this.router.url === this.menu[i].subItems[j].url) {
          if (this.menu[i].subItems[j].idAccess > 1) {
            this.editable = true;
          } else {
            this.editable = false;
          }
        }
      }
    }
    console.log('Editable : ' + this.editable);

    this.messageService.cargando(true);
    this.areaService.searchInfo('-1', '-1').subscribe(
      res => {
        this.results = this.utils.validarRespuestaFormatear(res);
        this.results = this.results;
        if (this.results.length === 0) {
          this.messageService.enviarMensaje(
            'Error búsqueda',
            ['Sin Resultados'],
            'info',
            this.dialogService
          );
        }
        this.messageService.cargando(false);
      },
      err => {
        this.messageService.cargando(false);
        console.log(err);
        this.utils.errorRespuesta();
      }
    );
  }

  openMyModalInsert() {
    this.myModalInsertInputNameArea = '';

    // open Modal
    this.myModalInsert.open();
  }

  insert(nameArea: String) {
    this.usuario = this.config[1].val;
    if (nameArea === '') {
      this.messageService.enviarMensaje(
        'Error Insertar',
        ['Verifique que todos los campos esten completos'],
        'info',
        this.dialogService
      );
    } else if (!this.validationAreaLength(nameArea)) {
      this.messageService.enviarMensaje(
        'Error Editar',
        ['Area no válido el largo maximo es de 50 caracteres'],
        'info',
        this.dialogService
      );
      return;
    } else if (this.validaCampoMin(nameArea.toString())) {
      this.messageService.enviarMensaje(
        'Error Insertar',
        [
          'Verifique los valores del campo nombre tenga un  minimo de 3 caracteres'
        ],
        'info',
        this.dialogService
      );
    } else {
      this.messageService.cargando(true);
      this.areaService.validateArea(nameArea).subscribe(
        resp => {
          this.resultValid = this.utils.validarRespuestaFormatear(resp);
          //  this.resultValid = resp.message;
          //  this.resultValid = JSON.parse(this.resultValid.toString());
          if (this.resultValid.response === 0) {
            console.log('EL area no existe en la base de datos');
            this.areaService.insert(nameArea).subscribe(
              res => {
                console.log(res);
                this.resultInsert = this.utils.validarRespuestaFormatear(res);

                // se inserta log
                this.insertarLog( 18, 0, this.usuario.idUser, '', nameArea.toString() );
                this.cleanResults();

                this.messageService.enviarMensaje(
                  'Insertar Area',
                  ['Area insertado correctamente'],
                  'info',
                  this.dialogService
                );

                this.areaService.searchInfo('-1', '-1').subscribe(
                  response => {
                    console.log(response);
                    this.results = this.utils.validarRespuestaFormatear(
                      response
                    );

                    if (this.results.length === 0) {
                      this.messageService.enviarMensaje(
                        'Error búsqueda',
                        ['Sin Resultados'],
                        'info',
                        this.dialogService
                      );
                    }
                    this.messageService.cargando(false);
                  },
                  err => {
                    this.utils.errorRespuesta();
                    console.log(err);
                    this.messageService.cargando(false);
                  }
                );

                this.myModalInsert.close();
              },
              err => {
                this.messageService.cargando(false);
                console.log(err);
                this.messageService.enviarMensaje(
                  'Error insertar Area',
                  ['Error servicio insertar area'],
                  'info',
                  this.dialogService
                );
              }
            );
          } else {
            this.messageService.enviarMensaje(
              'Error Insertar',
              ['EL area existe en la base de datos'],
              'info',
              this.dialogService
            );
            this.messageService.cargando(false);
          }
        },
        err => {
          this.utils.errorRespuesta();
          this.messageService.cargando(false);
          console.log(err);
          this.messageService.enviarMensaje(
            'Error insertar Area',
            ['Error servicio insertar area'],
            'info',
            this.dialogService
          );
        }
      );
    }
  }

  searchInfoUpdate(idAreaProfile: string) {
    this.messageService.cargando(true);
    if (this.resultsDetail !== []) {
      this.resultsDetail = [];
    }

    // search detail user
    this.areaService.searchInfoUpdate(idAreaProfile).subscribe(
      res => {
        console.log(res);
        this.resultsDetail = this.utils.validarRespuestaFormatear(res);
        this.resultsDetail = this.resultsDetail;
        this.messageService.cargando(false);
        console.log(this.resultsDetail);
      },
      err => {
        console.log(err);
        this.utils.errorRespuesta();
      }
    );
    // open Modal
    this.myModalUpdate.open();
  }

  update(idAreaProfile: number, nameArea: String) {
    console.log('Update: ' + idAreaProfile + ' ' + nameArea);

    if (idAreaProfile === 0 || nameArea === '') {
      this.messageService.enviarMensaje(
        'Error Editar',
        ['Verifique que todos los campos esten completos'],
        'info',
        this.dialogService
      );
    } else if (!this.validationAreaLength(nameArea)) {
      this.messageService.enviarMensaje(
        'Error Editar',
        ['Email no válido el largo maximo es de 150 caracteres'],
        'info',
        this.dialogService
      );
      return;
    } else {
      this.messageService.cargando(true);
      this.areaService
        .update(idAreaProfile.toString(), nameArea.toString())
        .subscribe(
          res => {
            console.log(res);
            this.resultUpdate = this.utils.validarRespuestaFormatear(res);
            console.log(this.resultUpdate);
            // this.results = res.message;
            // this.messageService.cargando(true);
            this.messageService.enviarMensaje(
              'Actualizar Area',
              ['Area actualizado correctamente'],
              'info',
              this.dialogService
            );

            // se inserta log
            this.insertarLog(
              19,
              0,
              this.usuario.idUser,
              '',
              nameArea.toString()
            );
            this.cleanResults();

            this.areaService.searchInfo('-1', '-1').subscribe(
              response => {
                console.log(response);

                this.results = this.utils.validarRespuestaFormatear(response);
                console.log(this.results);
                this.results = this.results;
                console.log(this.results);

                if (this.results.length === 0) {
                  this.messageService.enviarMensaje(
                    'Error búsqueda',
                    ['Sin Resultados'],
                    'info',
                    this.dialogService
                  );
                }
                this.messageService.cargando(false);
              },
              err => {
                console.log(err);
                this.utils.errorRespuesta();
                this.messageService.cargando(false);
              }
            );
            this.myModalUpdate.close();
          },
          err => {
            console.log(err);
            this.utils.errorRespuesta();
            this.messageService.cargando(false);
          }
        );
    }
  }

  openMyModalDelete(idAreaProfile: string) {
    this.idAreaProfileDeleteMyModal = idAreaProfile;

    // open Modal
    this.myModalDelete.open();
  }

  delete(idAreaProfile: String) {
    console.log('delete: ' + idAreaProfile);

    this.usuario = this.config[1].val;

    if (idAreaProfile === '') {
      this.messageService.enviarMensaje(
        'Error Elimnar',
        ['El id no existe'],
        'info',
        this.dialogService
      );
    } else {
      this.messageService.cargando(true);
      this.areaService.delete(idAreaProfile).subscribe(
        res => {
          console.log(res);
          this.resultDelete = this.utils.validarRespuestaFormatear(res);

          if (this.resultDelete.response === 1) {
            this.messageService.enviarMensaje(
              'Eliminar Area',
              ['Area Eliminada correctamente'],
              'info',
              this.dialogService
            );
            this.insertarLog(
              20,
              0,
              this.usuario.idUser,
              ' area eliminada ',
              ''
            );

            this.cleanResults();

            this.areaService.searchInfo(null, null).subscribe(
              response => {
                this.results = this.utils.validarRespuestaFormatear(response);
                if (this.results.length === 0) {
                  this.messageService.enviarMensaje(
                    'Error búsqueda',
                    ['Sin Resultados'],
                    'info',
                    this.dialogService
                  );
                  this.messageService.cargando(false);
                }

                this.messageService.cargando(false);
              },
              err => {
                console.log(err);
                this.utils.errorRespuesta();
                this.messageService.cargando(false);
              }
            );
            this.myModalDelete.close();
          } else {
            this.messageService.enviarMensaje(
              'Eliminar Area',
              ['Area No eliminada'],
              'info',
              this.dialogService
            );
            this.messageService.cargando(false);
          }
        },
        err => {
          console.log(err);
          this.utils.errorRespuesta();
          this.messageService.cargando(false);
        }
      );
    }
  }

  validationAreaLength(email: any) {
    if (email.length <= 50) {
      return true;
    } else {
      return false;
    }
  }

  validaCampoMin(str: string) {
    if (str.length < 3) {
      return true;
    } else {
      return false;
    }
  }

  insertarLog(
    idEvento: number,
    idOrder: number,
    idUser: number,
    valorAntiguo: string,
    valorNuevo: string
  ) {
    this.logService
      .insertarLogBitacora(idEvento, idOrder, idUser, valorAntiguo, valorNuevo)
      .subscribe(
        (res: any) => (this.ret = res),
        err => {
          console.log('ocurrio un error al insertar log');
          console.log(err);
        },
        () => {
          console.log(this.ret);
          if (this.ret.code !== undefined && this.ret.code === 0) {
            // this.ret = this.utils.validarRespuesta(this.ret);
            console.log('se inserto el log correctamente');
          } else {
            console.log('problemas al insertar el log correctamente');
          }
        }
      );
  }

  cleanResults() {
    this.results = [];
  }
}
