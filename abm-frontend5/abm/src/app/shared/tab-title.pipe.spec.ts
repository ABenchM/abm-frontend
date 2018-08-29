import { TabTitlePipe } from './tab-title.pipe';

fdescribe('TabTitlePipe', () => {
  let input = {'name': 'Common-Collections'};
  fit('should return name object of dictionary', () => {
    const pipe = new TabTitlePipe();
    expect(pipe.transform(input)).toBe('Common-Collections');
  });
});
