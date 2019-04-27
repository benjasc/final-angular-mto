import { Injectable } from '@angular/core';

@Injectable()
export class TableConfigSgo {
  dtOptionsExport: any = {
    bPaginate: false,
    language: {
      emptyTable: 'Ningún dato disponible en esta tabla',
     info:
       '',
     // infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      infoPostFix: '',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      search: "Buscar",
      zeroRecords: 'No se encontraron resultados',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: 'Siguiente',
        previous: 'Anterior'
      },
      aria: {
        sortAscending: ': Activar para ordenar la columna de manera ascendente',
        sortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    },
    destroy: true,
    pagingType: 'full_numbers',
    pageLength: 3,
    dom: 'Bfrtip',
    buttons: [],
    responsive: false,
    scrollX: true
  };
  

  dtOptionsWithinScrollX: any = {
    language: {
      emptyTable: 'Ningún dato disponible en esta tabla',
      info:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      infoPostFix: '',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      search: 'Buscar',
      zeroRecords: 'No se encontraron resultados',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: 'Siguiente',
        previous: 'Anterior'
      },
      aria: {
        sortAscending: ': Activar para ordenar la columna de manera ascendente',
        sortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    },
    destroy: true,
    pagingType: 'full_numbers',
    pageLength: 10,
    dom: 'Bfrtip',
    buttons: [ 'excel'],
    responsive: false,
    scrollX: false
  };

  dtOptionsWithinScrollXExcel: any = {
    language: {
      emptyTable: 'Ningún dato disponible en esta tabla',
      info:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      infoPostFix: '',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      search: 'Buscar',
      zeroRecords: 'No se encontraron resultados',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: 'Siguiente',
        previous: 'Anterior'
      },
      aria: {
        sortAscending: ': Activar para ordenar la columna de manera ascendente',
        sortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    },
    bDestroy:true,
    destroy: false,
    pagingType: 'full_numbers',
    pageLength: 10,
    dom: 'Bfrtip',
    buttons: [
     
  ],
    responsive: false,
    scrollX: false
  };
  dtOptionsWithinScrollXExcel1: any = {
    bPaginate: false,
    language: {
      emptyTable: 'Ningún dato disponible en esta tabla',
      info:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      infoPostFix: '',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      search: 'Buscar',
      zeroRecords: 'No se encontraron resultados',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: 'Siguiente',
        previous: 'Anterior'
      },
      aria: {
        sortAscending: ': Activar para ordenar la columna de manera ascendente',
        sortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    },
    bDestroy:true,
    destroy: false,
    pagingType: 'full_numbers',
    pageLength: 10,
    dom: 'Bfrtip',
    buttons: [
     
  ],
    responsive: false,
    "scrollY":        "200px",
    "scrollCollapse": true,
    "paging":         false
  };
  dtOptionsWithinScrollXExcel2: any = {
    language: {
      emptyTable: 'Ningún dato disponible en esta tabla',
      info:
        'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
      infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
      infoFiltered: '(filtrado de un total de _MAX_ registros)',
      infoPostFix: '',
      lengthMenu: 'Mostrar _MENU_ registros',
      loadingRecords: 'Cargando...',
      processing: 'Procesando...',
      search: 'Buscar',
      zeroRecords: 'No se encontraron resultados',
      paginate: {
        first: 'Primero',
        last: 'Último',
        next: 'Siguiente',
        previous: 'Anterior'
      },
      aria: {
        sortAscending: ': Activar para ordenar la columna de manera ascendente',
        sortDescending:
          ': Activar para ordenar la columna de manera descendente'
      }
    },
    pagingType: 'full_numbers',
    pageLength: 10,
    dom: 'Bfrtip',
    buttons: [
     
  ],
    responsive: false,
    scrollX: false
  };
  

  constructor() {}
}
