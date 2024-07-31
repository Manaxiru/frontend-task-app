import { Routes } from "@angular/router";
import { authGuard, noAuthGuard } from "@core/guards";
import { AppNavigation } from "@shared/navigation";
import { TasksComponent } from "@modules/index";

export const routes: Routes = [
	{
		path: AppNavigation.ROOT,
		redirectTo: AppNavigation.LOGIN,
		pathMatch: "full"
	},
	{
		path: AppNavigation.LOGIN,
		loadComponent: () => import("@core/pages").then((m) => m.LoginComponent),
		canActivate: [noAuthGuard]
	},
	{
		path: AppNavigation.DASHBOARD,
		loadComponent: () => import("@core/pages").then((m) => m.DashboardComponent),
		canActivate: [authGuard],
		children: [
			{ path: AppNavigation.ROOT, component: TasksComponent }
		]
	},
	{
		path: "**",
		loadComponent: () => import("@core/pages").then((m) => m.LoginComponent)
	}
];