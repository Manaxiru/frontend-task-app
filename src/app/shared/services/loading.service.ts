import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoadingService {
	private loading$: ReplaySubject<boolean>;
	private count$: BehaviorSubject<number>;

	constructor() {
		this.loading$ = new ReplaySubject(1);
		this.count$ = new BehaviorSubject(0);
	}

	setLoading(value: boolean = true) { this.loading$.next(value); }
	getLoading(): Observable<boolean> { return this.loading$.asObservable(); }
	getCount(): number { return this.count$.getValue(); }
	addCount() { this.count$.next(this.getCount() + 1); }
	subCount() { if (this.getCount() > 0) this.count$.next(this.getCount() - 1); }
}
