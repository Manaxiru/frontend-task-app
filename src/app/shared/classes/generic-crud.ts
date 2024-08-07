import { HttpClient, HttpContext } from "@angular/common/http";
import { inject } from "@angular/core";
import { first, Observable } from "rxjs";
import { BackendModules } from '@app/shared/enums';
import { IResponse } from '@app/shared/interfaces';
import { TOKEN_ENABLED } from "@app/core/interceptors";

export abstract class GenericCrud<T = any> {
	protected http: HttpClient = inject(HttpClient);

	constructor(private serviceModuleURL: BackendModules) { }

	protected create(data: Partial<T>, withContextToken: boolean = true): Observable<IResponse<T>> {
		return this.http.post<IResponse<T>>(
			this.serviceModuleURL,
			data,
			{ context: new HttpContext().set(TOKEN_ENABLED, withContextToken) }
		)
			.pipe(first());
	}

	protected readOne(id: string | number, withContextToken: boolean = true): Observable<IResponse<T>> {
		return this.http.get<IResponse<T>>(
			this.serviceModuleURL + `/${id}`,
			{ context: new HttpContext().set(TOKEN_ENABLED, withContextToken) }
		)
			.pipe(first());
	}

	protected readAll(withContextToken: boolean = true): Observable<IResponse<T[]>> {
		return this.http.get<IResponse<T[]>>(
			this.serviceModuleURL,
			{ context: new HttpContext().set(TOKEN_ENABLED, withContextToken) }
		)
			.pipe(first());
	}

	protected update(id: string | number, data: Partial<T>, withContextToken: boolean = true): Observable<IResponse<T>> {
		return this.http.put<IResponse<T>>(
			this.serviceModuleURL + `/${id}`,
			data,
			{ context: new HttpContext().set(TOKEN_ENABLED, withContextToken) }
		)
			.pipe(first());
	}

	protected delete(id: string | number, withContextToken: boolean = true): Observable<IResponse<T>> {
		return this.http.delete<IResponse<T>>(
			this.serviceModuleURL + `/${id}`,
			{ context: new HttpContext().set(TOKEN_ENABLED, withContextToken) }
		)
			.pipe(first());
	}
}
