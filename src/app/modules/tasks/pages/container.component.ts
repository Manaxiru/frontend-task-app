import { Component, effect, OnDestroy, signal, ViewChild, WritableSignal } from '@angular/core';
import { NgClass } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
	selector: 'app-container',
	standalone: true,
	imports: [
		NgClass,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatExpansionModule,
		MatDividerModule,
		MatChipsModule
	],
	templateUrl: './container.component.html',
	styleUrl: './container.component.scss',
	host: { class: "module" }
})
export class ContainerComponent implements OnDestroy {
	destroyed: Subject<void>;
	minWidth: string;
	fullMode: WritableSignal<boolean>;

	@ViewChild("matAccordionLeft") matAccordionLeft!: MatExpansionPanel;
	@ViewChild("matAccordionRight") matAccordionRight!: MatExpansionPanel;
	panel: Record<"LEFT" | "RIGHT", Boolean | null>;

	constructor(private breakpointObserver: BreakpointObserver) {
		this.destroyed = new Subject<void>();
		this.panel = { LEFT: null, RIGHT: null };
		// 327px Card Flexbox + Expand Buttons + Padding + Container Padding 10%;
		this.minWidth = "940px";
		this.fullMode = signal(false);
		this.breakpointObserver
			.observe(`(min-width: ${this.minWidth})`)
			.pipe(takeUntil(this.destroyed))
			.subscribe(({ matches }) => this.fullMode.set(matches));
		effect(() => {
			if (!this.fullMode()) {
				this.panel.LEFT = null;
				this.panel.RIGHT = null;
				this.matAccordionLeft.open();
				this.matAccordionRight.open();
			}
		})
	}

	expanded(side: "LEFT" | "RIGHT") {
		if (side === "LEFT" && !this.panel.LEFT) {
			this.panel.LEFT = true;
			this.panel.RIGHT = false;
			this.matAccordionRight.close();
			this.matAccordionLeft.open();
			return;
		}

		if (side === "RIGHT" && !this.panel.RIGHT) {
			this.panel.RIGHT = true;
			this.panel.LEFT = false;
			this.matAccordionLeft.close();
			this.matAccordionRight.open();
			return;
		}

		this.panel.LEFT = null;
		this.panel.RIGHT = null;
		this.matAccordionLeft.open();
		this.matAccordionRight.open();
	}

	ngOnDestroy(): void {
		this.destroyed.next();
		this.destroyed.complete();
	}
}
