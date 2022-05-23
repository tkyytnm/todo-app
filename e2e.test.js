const puppeteer = require("puppeteer");

describe("Google", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(() => browser.close());

  it('should be titled "Google"', async () => {
    await page.goto("https://google.com");
    await expect(await page.title()).toMatch("Google");
  });
});
