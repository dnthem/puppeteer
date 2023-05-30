import puppeteer from "puppeteer";
describe("e2e", () => {
    let browser;
    let page;
    const pageURL = import.meta.env.VITE_PREVIEW_URL??"http://localhost:5173/";
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto(pageURL, { waitUntil: "networkidle0" });
    });

    afterAll(async () => {
        await browser.close();
    });

    it('Click button counter', async () => {
        await page.waitForSelector('[data-test-id="testid"]');
        // click 10 times
        for (let i = 0; i < 10; i++) {
            await page.click('[data-test-id="testid"]');
        }
        // check if the counter is 10
        const counter = await page.$eval('[data-test-id="testid"]', el => el.textContent);
        const expectedResult = 'count is 10';
        expect(counter).toBe(expectedResult);
    });
});