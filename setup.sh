#!/bin/bash
git clone https://github.com/ABenchM/abm-frontend
cd abm-frontend
git checkout develop
npm install
cd abm-frontend5/abm
npm install
npm install -g  @angular/cli