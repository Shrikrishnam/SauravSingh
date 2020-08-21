import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  constructor(private userService: UserService) { }
  allAppointments = [
      
  ];

  details = {};

  

  ngOnInit() {
    this.getfitness();
  }
  
  getfitness() {
    this.userService.getfitnessdata().subscribe(data => {
      this.allAppointments = data;
  })
}
getSpecific(details) {
  this.details = details;
}
editfitness() {

}
deletefitness() {

}
}

