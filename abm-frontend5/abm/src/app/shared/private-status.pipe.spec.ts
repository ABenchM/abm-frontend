import { PrivateStatusPipe } from './private-status.pipe';

describe('PrivateStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new PrivateStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
