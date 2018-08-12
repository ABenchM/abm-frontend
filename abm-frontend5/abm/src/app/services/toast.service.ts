import { Injectable , ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';


@Injectable()
export class ToastService {

  vcRef: ViewContainerRef;

  constructor(private toastr: ToastsManager) {
    this.toastr.setRootViewContainerRef(this.vcRef);
   }

   showSuccess(message) {
    this.toastr.success(message, 'Success!');
  }
  showError(message) {
    this.toastr.error(message, 'Oops!');
  }
  showWarning(message) {
    this.toastr.warning(message, 'Alert!');
  }
  showInfo(message) {
    this.toastr.info(message);
  }

  showCustom(message) {
    this.toastr.custom('<span style="color: red">' + message + '</span>', null, {enableHTML: true});
  }

}
