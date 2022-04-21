import {Component, OnInit} from '@angular/core';
import {Service} from "../app.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {
  form: FormGroup;

  constructor(private service: Service, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.form = this.fb.group({
      location: ['California', Validators.required],
      country: ['USA', Validators.required],
      description: ['', Validators.required],
      tourist_target: ['', Validators.required],
      estimated_cost: ['', Validators.required],
    })
  }

  onSubmit(data: any) {
    if (Number(data.estimated_cost) > 0) {
      this.service.insertDestination(data)
        .subscribe({
          complete: () => {
            this.openSnackBar('Destination added successfully');
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
