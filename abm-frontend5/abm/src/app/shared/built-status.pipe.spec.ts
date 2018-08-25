import { BuiltStatusPipe } from './built-status.pipe';

fdescribe('BuiltStatusPipe', () => {
  fit('should return Built if true', () => {
    const pipe = new BuiltStatusPipe();
    expect(pipe.transform(true)).toBe('Built');
  });

  fit('should return Not Built if false', () => {
    const pipe = new BuiltStatusPipe();
    expect(pipe.transform(false)).toBe('Not Built');
  });
});
