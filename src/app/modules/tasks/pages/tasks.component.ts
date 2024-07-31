import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-tasks',
	standalone: true,
	imports: [MatCardModule, MatButtonModule, MatIconModule],
	templateUrl: './tasks.component.html',
	styleUrl: './tasks.component.scss',
	host: { class: "module" }
})
export class TasksComponent {

}
