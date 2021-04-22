import {Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GuestbookReview} from '../../services/review-service/review.model';

@Component({
  selector: 'app-dialog-create-review',
  templateUrl: './dialog-create-review.component.html',
  styleUrls: ['./dialog-create-review.component.scss']
})

export class DialogCreateReviewComponent {
  constructor(public dialogRef: MatDialogRef<DialogCreateReviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GuestbookReview) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
