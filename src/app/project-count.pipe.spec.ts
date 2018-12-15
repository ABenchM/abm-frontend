import { ProjectCountPipe } from './project-count.pipe';

fdescribe('ProjectCountPipe', () => {
 fit('Should Return Project if value is 1', () => {
    const pipe = new ProjectCountPipe();
    expect(pipe.transform(1)).toBe('1 Project');
  });
  fit('Should Return Projects if value > 1', () => {
    const pipe = new ProjectCountPipe();
    expect(pipe.transform(3)).toBe('3 Projects');
  });
});
