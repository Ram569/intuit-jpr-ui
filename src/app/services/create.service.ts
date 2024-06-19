import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Project} from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private apiUrl = '/jpr/v1/create';
  constructor(private http: HttpClient) { }

  createProject(name: string, type: string): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/${type}/${name}`, {}, {}).pipe(
      map(response => {
        let project: Project = response as Project;
        project.name = name;
        project.type = type;
        return project;
      }),
      catchError((err: any) => {
        return throwError(err.message);
      })
    );
  }
}
