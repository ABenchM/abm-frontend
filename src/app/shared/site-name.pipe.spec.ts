import { SiteNamePipe } from './site-name.pipe';

fdescribe('SiteNamePipe', () => {
  let input = 'api.github.com';
  fit('Should return GitHub when website includes github.com', () => {
    const pipe = new SiteNamePipe();
    expect(pipe.transform(input)).toBe('GitHub');
  });

  fit('Should return BitBucket when website includes bitbucket.org', () => {
    const pipe = new SiteNamePipe();
    expect(pipe.transform('api.bitbucket.org')).toBe('BitBucket');
  });

  fit('Should return Maven when website includes maven.com', () => {
    const pipe = new SiteNamePipe();
    expect(pipe.transform('api.maven.com')).toBe('Maven');
  });
});
