import { Component, Input } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import { Service } from 'src/app/model/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  displayedColumns = ['id', 'text', 'slika'];
  services: Service[] = [];

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.service.getAllServices().subscribe(data => {
      data.forEach(service => {
          this.services.push(service);
      });
    });
  }
}
