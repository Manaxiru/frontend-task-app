import { Injectable } from '@angular/core';
import { GenericCrud } from '@app/shared/classes';
import { BackendModules } from '@app/shared/enums';
import { ITask } from '../interfaces';
import { IResponse } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TasksService extends GenericCrud<ITask> {

	constructor() { super(BackendModules.TASKS); }

	override readAll(): Observable<IResponse<ITask[]>> { return super.readAll(); }
	override delete(id: string | number): Observable<IResponse<ITask>> { return super.delete(id); }
}
