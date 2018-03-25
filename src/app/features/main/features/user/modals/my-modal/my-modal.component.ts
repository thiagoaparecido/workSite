import {Component, ComponentRef} from '@angular/core';
import {IModalDialog, IModalDialogButton, IModalDialogOptions} from 'ngx-modal-dialog';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss']
})
export class MyModalComponent implements IModalDialog {
  actionButtons: IModalDialogButton[];

  constructor() {
    this.actionButtons = [
      { text: 'Close' },
      { text: 'I will always close', onAction: () => true },
      { text: 'I never close', onAction: () => false }
    ];
  }

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<any>>) {

  }

}
