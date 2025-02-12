# CardsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

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

## Application Functionality

- **Display Cards:** The main page displays a list of cards with title and content.
- **Add Cards:** Users can create new cards through a form. The creation flow adds the card to the in-memory list and resets the form. See the creation method in [`app.component.ts`](src/app/app.component.ts).
- **Edit Cards:** When a card is selected, its data is loaded into the form for editing. The edit functionality allows updating existing cards.
- **Remove Cards:** Users can remove a card from the list. If the card being edited is removed, the form is reset.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
