import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {CreateService} from '../../services/create.service';
import {Project} from '../../models/project';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [CreateService, AuthService]
})
export class CreateComponent implements OnInit {
  createFormGroup: FormGroup;
  types: any[];
  project: Project;
  errorMessage: string;
  constructor(private fb: FormBuilder, private createService: CreateService) {
  }
  ngOnInit() {
    this.types = [
      {id: 'JavaLibrary', name: 'Java Library'},
      {id: 'JavaWebService', name: 'Java Web Service'},
    ];
    this.createFormGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required]]
    });
  }
  createProject() {
    if (this.createFormGroup.valid) {
      const {name, type} = this.createFormGroup.value;
      this.createService.createProject(name, type).subscribe(response => {
        this.project = response;
      },
        (error: string) => {
          this.errorMessage = error;
          console.error(error);
        });
    }
  }
}
