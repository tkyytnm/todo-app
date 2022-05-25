const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");

let browser;
let page;
const user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
};

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
});

afterAll(async () => {
  await browser.close();
});

describe("Register new user", () => {
  test("display h2 text", async () => {
    await page.goto("http://localhost:3000/register");
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("Register");
  });

  test("Register using email that is used already.", async () => {
    await page.type("#email", "hanako@example.com");
    await page.type("#password", "pass");
    await page.click("button");
    await page.waitForSelector("p.message-red");
    expect(await page.$eval("p.message-red", (el) => el.textContent)).toMatch(
      "そのEmailアドレスはすでに登録されています。"
    );
  });

  test("Register new user", async () => {
    await page.evaluate(() => (document.getElementById("email").value = ""));
    await page.evaluate(() => (document.getElementById("password").value = ""));
    await page.type("#email", user.email);
    await page.type("#password", user.password);
    await page.click("button");
    await page.waitForNavigation();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("ToDo List");
  });

  test("Logout new user", async () => {
    await page.click("button.logout");
    await page.waitForNavigation();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("Login");
  });
});

describe("Login page", () => {
  test('"Login" in h2 element', async () => {
    await page.goto("http://localhost:3000/login");
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("Login");
  });

  test("display error message with wrong password", async () => {
    await page.goto("http://localhost:3000/login");
    await page.type("#email", "hanako@example.com");
    await page.type("#password", "aaaa");
    await page.click("button");
    await page.waitForSelector("p");
    expect(await page.$eval("p", (el) => el.textContent));
  });

  test("navigating after login succeeded", async () => {
    await page.goto("http://localhost:3000/login");
    await page.type("#email", "hanako@example.com");
    await page.type("#password", "pass");
    await page.click("button");
    await page.waitForNavigation();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("ToDo List");
  });

  test("logout button", async () => {
    await page.click("button.logout");
    await page.waitForNavigation();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("Login");
  });
});

describe("ToDo list page", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000/login");
    await page.type("#email", "hanako@example.com");
    await page.type("#password", "pass");
    await page.click("button");
    await page.waitForNavigation();
  });

  afterAll(async () => {
    await page.click("button.logout");
  });

  test("click navigation links", async () => {
    const handle = await page.$$("nav a");
    await handle[1].click();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch(
      "User profile"
    );
    await handle[0].click();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("ToDo List");
  });

  const newToDo = faker.word.verb();
  test("add todo", async () => {
    await page.type("#add-body", newToDo);
    await page.waitForTimeout(1000);
    await page.click("button.add");
    await page.waitForTimeout(1000);

    expect(
      await page.$$eval(
        'input[type="text"]#body',
        (el) => el[el.length - 1].value
      )
    ).toMatch(newToDo);
  });

  test("Delete todo", async () => {
    const delButtons = await page.$$("button.delete");
    await delButtons[delButtons.length - 1].click();
    await page.waitForTimeout(1000);

    expect(
      await page.$$eval(
        'input[type="text"]#body',
        (el) => el[el.length - 1].value
      )
    ).not.toMatch(newToDo);
  });
});
