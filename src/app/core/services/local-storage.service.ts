import { Injectable } from '@angular/core';
import { IUser } from '@app/shared/interfaces';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	getItem(name: string = "user"): IUser | null {
		return localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)!) : null;
	}

	setItem(name: string, data: IUser) { localStorage.setItem(name, JSON.stringify(data)); }

	clear() { localStorage.clear(); }
}
