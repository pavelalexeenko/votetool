import { VoteToolPage } from './app.po';

describe('vote-tool App', () => {
  let page: VoteToolPage;

  beforeEach(() => {
    page = new VoteToolPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
