import { ConnectionStatePipe } from './connection-state.pipe';

describe('ConnectionStatePipe', () => {
  it('create an instance', () => {
    const pipe = new ConnectionStatePipe();
    expect(pipe).toBeTruthy();
  });
});
