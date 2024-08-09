# ATOM FE CHALLENGE TEMPLATE - ANGULAR

Este proyecto es una plantilla con lo necesario para comenzar a desarrollar el front-end de la aplicación de la prueba técnica de Atom. Se base en Angular con la versión 17.3.6.
Se ha realizado la instalación y configuración de varias dependencias necesarias para el desarrollo de la aplicación, como por ejemplo: Angular Material.

## Instrucciones
Siéntete libre de clonar este repositorio y utilizarlo como base para el desarrollo de la aplicación. Sigue las indicates de la prueba técnica para completar la aplicación y desarrolla como más te sientas cómodo.

De igual manera puedes documentar dentro de este archivo todo lo que deseas contar sobre tu desarrollo, como por ejemplo, decisiones de diseño, problemas encontrados, etc.

## Comentarios sobre el desarrollo
### Frontend
De este lado, las decisiones de diseño a nivel de colores fueron tomadas de la paleta suministrada en este template, con adición de algunas paletas generadas por el [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/).

Con respecto a las herramientas de Angular, decidí usar para el desarrollo en su mayor parte las características que ofrecen las versiones +17 (Signals, Built-in control flow…), en algunos componentes al 100%, en otros al 50% y otros con solo las características ya conocidas de versiones anteriores, hecho de esta forma para demostrar como acostumbro a implementar las características del lenguaje en sus diferentes versiones.

En resoluciones más amplias decidí implementar además de la casilla de verificación (ícono de check), la funcionalidad de Drag & Drop para también arrastrar las tareas y completarlas o colocarlas en pendiente respectivamente. En resoluciones más bajas, se desactiva esta opción pero se habilitan los paneles para priorizar mostrar más tareas en pantalla.

La URL de la aplicación en producción en Firebase Hosting es la siguiente [Task App](https://hola-a9e75.web.app).

### Backend
Aquí me encontré con complicación debido a mi país de residencia que me imposibilita usar mis tarjetas de crédito u otros métodos de pago para poder utilizar el servicio de Firebase Cloud Functions, indicado en el documento del reto.

Debido a esto tomé otro enfoque del reto usando otra plataforma SaaS, Netlify; que también posee servicios similares para las funciones backendless o cloud functions, usando estás para comunicarme con el SaaS de Firebase y usar los servicios que se indican en el documento (Firebase Firestore), así como también el servicio de autentificación (Firebase Authentication).

La URL de las funciones generadas por Netlify como una API están en los siguientes enlaces con su respectiva documentación en postman; [API](https://maug-task-app.netlify.app/api), [Documentación POSTMAN](https://documenter.getpostman.com/view/13544160/2sA3s1osHa).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
