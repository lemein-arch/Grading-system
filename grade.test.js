const { calculateTotal, median } = require('./calculations');
const puppeteer = require("puppeteer");
var testArray = [2, 3, 4, 5, 1, 6, 7];

test ('Q1=30, Q2=60: total=100', () => {
    expect(calculateTotal(30, 60)).toBe(100);
});

test ('median test =4', () => {
    expect(median(testArray)).toBe(4);
});

/*
describe ('testing with puppeteer' , () =>{
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    it('check title of page', async () => {
        await page.goto("http://localhost:3000/");
        const pageTitle = await page.title();
        expect(pageTitle).toEqual('Student Grading System');
        await browser.close();
    }, 70000);
});
*/