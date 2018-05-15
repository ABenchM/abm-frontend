# Developer Manual
1) Clone the repository and switch to the develop branch.
2) Open the file abm-config.dev.json, and replace the url by the url of the backend you want to use: "http://localhost:8080/" for a local installation of the backend or "https://abm.cs.upb.de/" for the server's backend.
3) Install Node.js (8+).
4) Navigate to git root directory and execute

```
npm install
```
5) <a name="in1"></a>Start Node.js server with express middleware using (In some systems `nodejs` should be used instead of `node`)

```
node index.js
```
6) Navigate to 
```
cd abm-frontend5/abm/
```
7) Run
```
npm install
```
8) Then install angular cli with sudo access
```
sudo npm install -g @angular/cli
```
9) <a name="in2"></a> During the development, to continually build, run with watch flag
```
ng build --watch
```
10) Make sure both [3](#in1) and [7](#in2) are running then navigate to [http://localhost:3000](http://localhost:3000)
11) To test the code, run (Make sure Google Chrome is installed) 
```
ng test
```
