import { Routes } from "@angular/router";
import { AppNavigation } from "@shared/navigation";
import { authGuard } from "@core/guards";
import { noAuthGuard } from "./core/guards/auth.guard";

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
		canActivate: [authGuard]
	},
	{
		path: "**",
		loadComponent: () => import("@core/pages").then((m) => m.LoginComponent)
	}
];