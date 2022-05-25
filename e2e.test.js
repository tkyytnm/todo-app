const puppeteer = require("puppeteer");
const { faker } = require("@faker-js/faker");

let browser;
let page;
const user = {
  email: faker.internet.email(),
  newEmail: faker.internet.email(),
  password: faker.internet.password(),
  newPassword: faker.internet.password(),
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
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch(
      "ユーザー登録"
    );
  });

  test("Register new user", async () => {
    await page.evaluate(() => (document.getElementById("email").value = ""));
    await page.evaluate(() => (document.getElementById("password").value = ""));
    await page.type("#email", user.email);
    await page.type("#password", user.password);
    await page.click("button");
    await page.waitForNavigation();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch(
      "タスクリスト"
    );
  });

  test("Logout new user", async () => {
    await page.click("button.logout");
    await page.waitForNavigation();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("ログイン");
  });
});

test("Register user with email that is used already.", async () => {
  await page.goto("http:localhost:3000/register");
  await page.type("#email", user.email);
  await page.type("#password", user.password);
  await page.click("button");
  await page.waitForSelector("p.message-red");
  expect(await page.$eval("p.message-red", (el) => el.textContent)).toMatch(
    "そのEmailアドレスはすでに登録されています。"
  );
});

describe("Login page", () => {
  test("display h2 element", async () => {
    await page.goto("http://localhost:3000/login");
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("ログイン");
  });

  test("display error message with wrong password", async () => {
    await page.goto("http://localhost:3000/login");
    await page.type("#email", user.email);
    await page.type("#password", "aaaa");
    await page.click("button");
    await page.waitForSelector("p");
    expect(await page.$eval("p", (el) => el.textContent));
  });

  test("navigating after login succeeded", async () => {
    await page.goto("http://localhost:3000/login");
    await page.type("#email", user.email);
    await page.type("#password", user.password);
    await page.click("button");
    await page.waitForNavigation();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch(
      "タスクリスト"
    );
  });

  test("logout button", async () => {
    await page.click("button.logout");
    await page.waitForNavigation();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch("ログイン");
  });
});

describe("ToDo list page", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000/login");
    await page.type("#email", user.email);
    await page.type("#password", user.password);
    await page.click("button");
    await page.waitForNavigation();
  });

  test("click navigation links", async () => {
    const handle = await page.$$("nav a");
    await handle[1].click();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch(
      "ユーザー設定"
    );
    await handle[0].click();
    expect(await page.$eval("h2", (el) => el.textContent)).toMatch(
      "タスクリスト"
    );
  });

  const newToDo = faker.word.verb();
  test("add 2 todo", async () => {
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
        (el) => el[el.length - 1]?.value
      )
    ).not.toBe(newToDo);
  });
});

describe("User page", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000/user");
  });

  test("Update email address", async () => {
    await page.evaluate(() => (document.getElementById("email").value = ""));
    await page.type("#email", user.newEmail);
    const buttons = await page.$$("button.update");
    await buttons[0].click();
    const navLink = await page.$$("nav a");
    await page.waitForTimeout(1000);
    expect(await navLink[1].evaluate((el) => el.textContent)).toBe(
      user.newEmail
    );
  });

  test("Update password and logout and login", async () => {
    await page.type("#password", user.newPassword);
    const buttons = await page.$$("button.update");
    await buttons[1].click();
    await page.click("button.logout");
    await page.waitForNavigation();

    await page.type("#email", user.newEmail);
    await page.type("#password", user.newPassword);
    await page.click("button");
    await page.waitForNavigation();

    expect(await page.url()).toBe("http://localhost:3000/todo");
  });

  test("Delete user account", async () => {
    await page.goto("http://localhost:3000/user");
    await page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await page.click("button.delete");
    await page.waitForNavigation();
    expect(await page.url()).toBe("http://localhost:3000/login");
  });
});
