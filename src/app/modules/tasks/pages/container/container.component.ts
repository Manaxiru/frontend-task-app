import { Component, effect, OnInit, OnDestroy, signal, ViewChild, WritableSignal, Signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { TasksService } from '../../services';
import { ITask } from '../../interfaces';
import { FormComponent, TaskComponent } from '../../components';

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
		MatChipsModule,
		FormComponent,
		TaskComponent
	],
	templateUrl: './container.component.html',
	styleUrl: './container.component.scss',
	animations: [
		trigger("showFormTrigger", [
			transition(":enter", [
				style({ "max-height": 0, height: 0, opacity: 0 }),
				animate(500, style({ "max-height": "100vh", height: "100%", opacity: 1 }))
			]),
			transition(":leave", [
				animate(125, style({ "max-height": "100vh", height: 0, opacity: 0 }))
			])
		]),
		trigger("showAddButtonTrigger", [
			transition(":enter", [
				style({ opacity: 0 }),
				animate("125ms 125ms", style({ opacity: 1 }))
			])
		])
	],
	host: { class: "module" }
})
export class ContainerComponent implements OnInit, OnDestroy {
	destroyed: Subject<void>;
	minWidth: string;
	fullModeSignal: WritableSignal<boolean>;

	@ViewChild("matAccordionLeft") matAccordionLeft!: MatExpansionPanel;
	@ViewChild("matAccordionRight") matAccordionRight!: MatExpansionPanel;
	panel: Record<"LEFT" | "RIGHT", Boolean | null>;

	showForm: boolean;

	tasksSignal: WritableSignal<ITask[]>;
	tasksByFilterSignal: Signal<Record<"PENDING" | "COMPLETED", ITask[]>>;

	constructor(
		private tasksService: TasksService,
		private breakpointObserver: BreakpointObserver
	) {
		this.destroyed = new Subject<void>();
		this.panel = { LEFT: null, RIGHT: null };
		this.showForm = false;
		// 327px Card Flexbox + Expand Buttons + Padding + Container Padding 10%;
		this.minWidth = "940px";
		this.fullModeSignal = signal(false);
		this.tasksSignal = signal([]);
		this.breakpointObserver
			.observe(`(min-width: ${this.minWidth})`)
			.pipe(takeUntil(this.destroyed))
			.subscribe(({ matches }) => this.fullModeSignal.set(matches));
		effect(() => {
			this.fullModeSignal();
			this.panel = { LEFT: null, RIGHT: null };
			this.matAccordionLeft.open();
			this.matAccordionRight.open();
		});
		this.tasksByFilterSignal = computed(() => {
			const tasks = this.tasksSignal();
			return {
				PENDING: tasks.filter(x => !x.completed),
				COMPLETED: tasks.filter(x => x.completed)
			}
		});
	}

	ngOnInit(): void {
		this.tasksSignal.set([]);
		this.readAll();
	}

	readAll() {
		this.showForm = false;
		this.tasksService.readAll().subscribe(res => {
			console.log("👀 ~ ContainerComponent ~ this.tasksService.readAll ~ res:", res);
			console.table(res.data);
			if (res.success) this.tasksSignal.set(res.data as ITask[]);
		});
	}

	expanded(side: "LEFT" | "RIGHT") {
		if (side === "LEFT" && !this.panel.LEFT) {
			this.matAccordionRight.close();
			this.panel.LEFT = true;
			this.panel.RIGHT = false;
			this.matAccordionLeft.open();
			return;
		}

		if (side === "RIGHT" && !this.panel.RIGHT) {
			this.matAccordionLeft.close();
			this.panel.RIGHT = true;
			this.panel.LEFT = false;
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
