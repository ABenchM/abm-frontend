# Abm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Developer Manual
1) Clone the repository and switch to the develop branch.
2) Open the file abm-config.dev.json, and replace the url by the url of the backend you want to use: "http://localhost:8080/" for a local installation of the backend or "https://abm.cs.upb.de/" for the server's backend.
3) Install Node.js (8+): https://nodesource.com/blog/installing-node-js-tutorial-ubuntu/
4) Navigate to git root directory and execute

```
npm install
```
5) Then install angular cli with sudo access
```
sudo npm install -g @angular/cli
```
6) <a name="in2"></a> During the development, to continually build, run with watch flag
```
ng build --watch
```
7) To test the code, run 
```
ng test
```
8) <a name="in1"></a>Start Node.js server with express middleware using (In some systems `nodejs` should be used instead of `node`)

```
node index.js
```
9) Make sure [8](#in1) is running then navigate to [http://localhost:3000](http://localhost:3000)
