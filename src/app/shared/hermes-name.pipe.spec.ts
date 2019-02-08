import { HermesNamePipe } from './hermes-name.pipe';

fdescribe('HermesNamePipe', () => {
  const input = 'org.opalj.hermes.queries.sizeofInheritanceTree';
  fit('should truncate the hermes name to last name', () => {
    const pipe = new HermesNamePipe();
    expect(pipe.transform(input)).toBe('sizeofInheritanceTree');
  });
});
