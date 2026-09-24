import { Routes } from '@angular/router';
import {
  AboutPage,
  ClaimsPage,
  ContactPage,
  CustomerCarePage,
  FleetPage,
  HomePage,
  SafetyPage,
  ServicesPage,
} from './pages';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: HomePage },
  { path: 'nosotros', component: AboutPage },
  { path: 'servicios', component: ServicesPage },
  { path: 'flota', component: FleetPage },
  { path: 'seguridad', component: SafetyPage },
  { path: 'contacto', component: ContactPage },
  { path: 'atencion', component: CustomerCarePage },
  { path: 'reclamos', component: ClaimsPage },
  { path: '**', redirectTo: 'inicio' },
];
