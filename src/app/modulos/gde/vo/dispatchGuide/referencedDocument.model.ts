import { DocumentModel } from './document.model';

export class ReferencedDocumentModel {
  public documents: Array<DocumentModel>;
  public observations: String;

  constructor() {
    this.documents = undefined;
    this.observations = undefined;
  }
}
