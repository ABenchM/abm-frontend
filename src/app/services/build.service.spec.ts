import { TestBed, inject } from '@angular/core/testing';
import { Http, HttpModule} from '@angular/http';
import { BuildService } from './build.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';

describe('BuildService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, ToastrModule.forRoot()],
      providers: [BuildService, ToastrService]
    });
  });

  fit('should be created', inject([BuildService], (service: BuildService) => {
    expect(service).toBeTruthy();
  }));
});
