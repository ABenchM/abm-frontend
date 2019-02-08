import { FileSizePipe } from './file-size.pipe';

fdescribe('FileSizePipe', () => {
  fit('should return 450kB for 450 input value', () => {
    const pipe = new FileSizePipe();
    expect(pipe.transform(450)).toBe('450kB');
  });

  fit('should return 1.00 MB for 1024 input value', () => {
    const pipe = new FileSizePipe();
    expect(pipe.transform(1024)).toBe('1.00 MB');
  });

  fit('should return 1.00 GB for 1048576 input value', () => {
    const pipe = new FileSizePipe();
    expect(pipe.transform(1048576)).toBe('1.00 GB');
  });


});
