import { BuildColourPipe } from './build-colour.pipe';

fdescribe('BuildColourPipe', () => {
  fit('Should return #66d9ff when running', () => {
    const pipe = new BuildColourPipe();
    expect(pipe.transform('RUNNING')).toBe('rgb(102, 217, 255)');
  });
  fit('Should return #8cff66 when finished', () => {
    const pipe = new BuildColourPipe();
    expect(pipe.transform('FINISHED')).toBe('rgb(140, 255, 102)');
  });
  fit('Should return #ffe866 when running', () => {
    const pipe = new BuildColourPipe();
    expect(pipe.transform('CANCELLED')).toBe('rgb(255, 232, 102)');
  });
  fit('Should return #ff3333 when running', () => {
    const pipe = new BuildColourPipe();
    expect(pipe.transform('FAILED')).toBe('rgb(255, 51, 51)');
  });
  fit('Should return #726d6d when running', () => {
    const pipe = new BuildColourPipe();
    expect(pipe.transform('NotRunning')).toBe('gray');
  });
});
