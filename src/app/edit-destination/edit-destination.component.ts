import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../app.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.css']
})
export class EditDestinationComponent implements OnInit {
  form: FormGroup;

  constructor(private service: Service, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.form = this.fb.group({
      destination_id: ['', Validators.required],
      location: [''],
      country: [''],
      description: [''],
      tourist_target: [''],
      estimated_cost: [''],
    })
  }

  onSubmit(data: any) {
    if (!data.estimated_cost || Number(data.estimated_cost) > 0) {
      this.service.updateDestination(data)
        .subscribe({
          complete: () => {
            this.openSnackBar('Destination updated successfully');
          },
          error: (error) => {
            const message = error.error?.error ?? 'Unknown server error';
            this.openSnackBar(message);
          },
        })
    }
    this.openSnackBar('Estimated cost should be a positive number!');
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
      horizontalPosition: 'left',
    });
  }
}
