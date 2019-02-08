import { PrivateStatusPipe } from './private-status.pipe';

fdescribe('PrivateStatusPipe', () => {
let input = true;
  fit('should return "Private" if true', () => {
    const pipe = new PrivateStatusPipe();
    expect(pipe.transform(input)).toBe('Private');
  });
  fit('should return "Public" if false', () => {
    const pipe = new PrivateStatusPipe();
    expect(pipe.transform(!input)).toBe('Public');
  });
});
