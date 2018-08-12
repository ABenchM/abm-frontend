import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Injectable()
export class BuildService {

  constructor(private http: Http, private toastr: ToastsManager) {

  }
  builds = [];
  initialSelection;
  isOpen = false;
  buildstoRegister = [];
  findingStep = false;
  openingSocket = false;
  socket: any;
  postBuild(version) {
    return this.http.post('/rest/build', version, null);
  }


  deleteBuild(buildResultId) {
    return this.http.delete('/rest/build/' + buildResultId);
  }

  getBuild(versionId) {
      return this.http.get('/rest/build/' + versionId);
  }

  getUserBuild(user) {
    return this.http.get('/rest/builds/' + user);
  }

  addListener(buildId) {
    if (!this.isOpen) {
      this.buildstoRegister.push(buildId);
      if (!this.openingSocket) {
        this.openSocket();
      }
    } else {
      this.socket.send(JSON.stringify({ msg: 'listen', id: buildId }));
    }
  }

  openSocket() {
    this.openingSocket = true;
    this.socket = new WebSocket('ws://localhost:8080/ws/build');
    this.socket.binaryType = 'arraybuffer';
    this.socket.open = function () {
      console.log('Socket is open!');
      this.isOpen = true;
      for (let i = 0; i < this.buildsToRegister.length; i++) {
        this.socket.send(JSON.stringify({ msg: 'listen', id: this.buildsToRegister[i] }));
      }
      this.buildsToRegister.splice(0, this.buildsToRegister.length);
    };
    this.socket.onmessage = function (e) {
      const resp = JSON.parse(e.data);
      if (resp.msg === 'step_changed') {
        const step = resp.step;
        if (step.name === 'Delete Docker image' && step.status === 'SUCCESS') {
          this.updateBuild(step.id);
        }
      }
    };
    this.socket.onclose = function (e) {
      console.log('Connection closed');
      this.isOpen = false;
    };
  }

  updateBuild(stepId) {
    this.findingStep = true;
    for (let i = 0; i < this.builds.length; i++) {
      this.checkBuild(stepId, i);
      if (!this.findingStep) { break; }
    }
  }

  checkBuild(stepId, i) {

    this.http.get('/rest/build/' + this.builds[i].id).subscribe(
      response => {
        if (response.status === 200) {
          const buildResult = response.json();
          for (let j = 0; j < buildResult.projectBuilds.length; j++) {
            if (!this.findingStep) { return; }
            const projectBuild = buildResult.projectBuilds[j];
            for (let k = 0; k < projectBuild.buildSteps.length; k++) {
              if (projectBuild.buildSteps[k].id === stepId) {
                this.findingStep = false;
                this.builds[i].progress = (j + 1) / buildResult.projectBuilds.length;
                if (buildResult.status === 'RUNNING' && this.builds[i].progress === 1) {
                  const failed = this.checkFailure(buildResult);
                  if (failed) {
                    this.builds[i].buildStatus = 'FAILED';
                    this.toastr.error(this.builds[i].name + ' failed to build');
                  } else {
                    this.builds[i].buildStatus = 'FINISHED';
                    this.toastr.success(this.builds[i].name + ' has been built');
                  }
                } else {
                  this.builds[i].buildStatus = buildResult.status;
                }
                return;
              }
            }
          }
        }
      }
    );




  }

  checkFailure(buildResult) {
    for (let i = 0; i < buildResult.projectBuilds.length; i++) {
      const projectBuild = buildResult.projectBuilds[i];
      let allGood = true;
      for (let j = 0; j < projectBuild.buildSteps.length; j++) {
        if (projectBuild.buildSteps[j].status !== 'SUCCESS') {
          allGood = false;
        }
      }
      if (allGood) { return false; }
    }
    return true;
  }
}
