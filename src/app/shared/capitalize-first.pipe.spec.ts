import { CapitalizeFirstPipe } from './capitalize-first.pipe';

fdescribe('CapitalizeFirstPipe', () => {

  let pipe = new CapitalizeFirstPipe();

  fit('transform "abc" to "Abc"', () => {
     expect(pipe.transform('abc')).toBe('Abc');
  });
});
