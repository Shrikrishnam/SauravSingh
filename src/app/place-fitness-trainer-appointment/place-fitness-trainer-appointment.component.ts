import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';


export class Fitness {
    constructor(
        public inr: number,
        public paisa: number,
        public streetaddress: string,
        public city: string,
        public state: string,
        public country: string,
        public pincode: number,
        public phonenumber: number,
        public email: string,
        public firstname: string,
        public lastname: string,
        public age: number,
        public trainerpreference: string,
        public physiotherapist: string,
        public packages: string
    ) { }
}

@Component({
    selector: 'app-place-fitness-trainer-appointment',
    templateUrl: './place-fitness-trainer-appointment.component.html'

})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

    // @ViewChild('firstname') firstname: ElementRef;

    fitnessForm: FormGroup;
    editMode = false;
    id = null;
    editForm: any;

    constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.initForm();
        })

        // this.firstname.nativeElement.focus();
    }
    initForm() {
        if (this.id) {
            this.editMode = true;
            this.userService.getfitnessdata().subscribe(data => {
                this.editForm = data.find(i => i.id === this.id);
                console.log(this.editForm);
                this.fitnessForm = this.fb.group({
                    firstname: [this.editForm.firstname, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
                    lastname: [this.editForm.lastname, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
                    age: [this.editForm.age, [Validators.required, Validators.min(18), Validators.max(60)]],
                    email: [this.editForm.email, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
                    phonenumber: [this.editForm.phonenumber, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
                    streetaddress: [this.editForm.streetaddress, [Validators.required]],
                    city: [this.editForm.city, [Validators.required]],
                    state: [this.editForm.state, [Validators.required]],
                    country: [this.editForm.country, [Validators.required]],
                    pincode: [this.editForm.pincode, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
                    trainerpreference: [this.editForm.trainerpreference, [Validators.required]],
                    physiotherapist: [this.editForm.physiotherapist, [Validators.required]],
                    packages: [this.editForm.packages, [Validators.required]],
                    inr: [this.editForm.inr, [Validators.required]],
                    paisa: [this.editForm.paisa, [Validators.required]],
                });
            });
        } else {
            this.fitnessForm = this.fb.group({
                firstname: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
                lastname: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
                age: ["", [Validators.required, Validators.min(18), Validators.max(60)]],
                email: ["", [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
                phonenumber: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
                streetaddress: ["", [Validators.required]],
                city: ["", [Validators.required]],
                state: ["", [Validators.required]],
                country: ["", [Validators.required]],
                pincode: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]],
                trainerpreference: ["", [Validators.required]],
                physiotherapist: ["", [Validators.required]],
                packages: ["", [Validators.required]],
                inr: ["", [Validators.required]],
                paisa: ["", [Validators.required]],
            });
        }
    }

    onSubmit() {
        if (this.fitnessForm.valid) {
            let data = this.fitnessForm.value;
            //   if(this.editMode) {
            //       this.editMode = false;
            //       data = {...data, id: this.id}
            //   }
            this.editMode = false;
            this.fitnessForm.reset();
            this.userService.postfitnessdata(data).subscribe(res => {
                alert('Appointment Successfully Created!!');
            });
        } else {
            alert('Form Not Valid!!!');
        }
    }

}
