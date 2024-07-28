import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { first, Observable } from "rxjs";
import { BackendModules } from '@app/shared/enums';
import { IResponse } from '@app/shared/interfaces';

export abstract class GenericCrud<T = any> {
	protected http: HttpClient = inject(HttpClient);

	constructor(private serviceModuleURL: BackendModules) { }

	protected create(data: Partial<T>): Observable<IResponse<T>> {
		return this.http.post<IResponse<T>>(this.serviceModuleURL, data)
			.pipe(first());
	}

	protected readOne(id: string | number): Observable<IResponse<T>> {
		return this.http.get<IResponse<T>>(this.serviceModuleURL + `/${id}`)
			.pipe(first());
	}

	protected readAll(): Observable<IResponse<T[]>> {
		return this.http.get<IResponse<T[]>>(this.serviceModuleURL)
			.pipe(first());
	}

	protected update(id: string | number, data: Partial<T>): Observable<IResponse<T>> {
		return this.http.patch<IResponse<T>>(this.serviceModuleURL + `/${id}`, data)
			.pipe(first());
	}

	protected delete(id: string | number): Observable<IResponse<T>> {
		return this.http.delete<IResponse<T>>(this.serviceModuleURL + `/${id}`)
			.pipe(first());
	}
}
