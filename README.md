# Developer Manual
1) Install Node.js(8+).
2) Navigate to git root directory and execute

```
npm install
```
3) <a name="in1"></a>Start Node.js server with express middleware using (In some systems `nodejs` should be used instead of `node`)

```
node index.js
```
4) Navigate to 
```
cd abm-frontend5/abm/
```
5) Run
```
npm install
```
6) Then install angular cli with sudo access
```
sudo npm install -g @angular/cli
```
7) <a name="in2"></a> During the development to continually build, run with watch flag
```
ng build --watch
```
8) To test front end code, run (Make sure Google Chrome is installed) 
```
ng test
```
9) Make sure both [3](#in1) and [7](#in2) are running then navigate to [http://localhost:3000](http://localhost:3000)
