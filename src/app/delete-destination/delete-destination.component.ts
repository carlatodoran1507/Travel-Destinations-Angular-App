import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../app.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete-destination',
  templateUrl: './delete-destination.component.html',
  styleUrls: ['./delete-destination.component.css']
})
export class DeleteDestinationComponent implements OnInit {
  form: FormGroup;

  constructor(private service: Service, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.form = this.fb.group({
      destination_id: ['', Validators.required],
    })
  }

  onSubmit(data: any) {
    if (Number(data.destination_id) > 0) {
      this.service.deleteDestination(data.destination_id)
        .subscribe({
          complete: () => {
            this.openSnackBar('Destination deleted successfully!');
          },
          error: (error) => {
            const message = error.error?.error ?? 'Unknown server error';
            this.openSnackBar(message);
          },
        })
    }
    this.openSnackBar('Destination number should be a positive number!');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
      horizontalPosition: 'left',
    });
  }
}
