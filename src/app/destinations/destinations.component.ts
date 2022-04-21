import {Component, OnInit} from '@angular/core';
import {Destination, Service} from "../app.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  form: FormGroup;
  destinations: Destination[];
  displayedDestinations: (Destination | null)[];
  destinationCounter = 0;
  filter = '';
  page = 1;

  constructor(private service: Service, private fb: FormBuilder) {
    this.createForm();
    this.getDestinations();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.form = this.fb.group({
      countryFilter: [''],
    })
  }

  getDestinations() {
    this.service.getDestinations(this.page, this.filter)
      .subscribe((data: Destination[]) => {
        this.destinations = data;
        this.destinationCounter = this.destinations.length;
        this.displayedDestinations = data.map((d, index) => index % 2 === 1 ? [d, null] : [d]).flat(1);
      })
  }

  getPreviousPage() {
    this.page -= 1;
    this.getDestinations();
  }

  getNextPage() {
    this.page += 1;
    this.getDestinations();
  }

  onSubmit(value: any) {
    this.page = 1;
    this.filter = value.countryFilter;

    this.getDestinations();
  }
}
