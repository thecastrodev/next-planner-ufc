const puppeteer = require("puppeteer");

const LAUNCH_PUPPETEER_OPTS = {
  headless: false,
  ignoreHTTPSErrors: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1040,800'
  ],
  defaultViewport: {
    width: 1040,
    height: 800,
  }
};

const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 3000000
};

const SIGAA_PATHS = {
  userSelector: "#conteudo > table > tbody > tr > td > div > form > table > tbody > tr:nth-child(1) > td > input[type=text]",
  passSelector: "#conteudo > table > tbody > tr > td > div > form > table > tbody > tr:nth-child(2) > td > input[type=password]",
  submitSelector: "#conteudo > table > tbody > tr > td > div > form > table > tfoot > tr > td > input[type=submit]"
}

class Puppeteer {
  browser;

  constructor() {
    this.browser = null;
  }

  async initBrowser() {
    if (!this.browser) {
      this.browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
    } else this.browser;
  }

  async getNewPage() {
    try {
      const page = await this.browser.newPage();
      return page;
    } catch (err) {
      throw err;
    }
  }

  async goTo(page, url) {
    try {
      await page.goto(url, PAGE_PUPPETEER_OPTS);
    } catch (err) {
      throw err;
    }
  }

  async doLogin(page, user_login, pass_login) {
    await page.waitForSelector("#conteudo");
    await page.click("#conteudo");
    await page.waitForSelector(SIGAA_PATHS.userSelector);
    await page.type("input[type=text]", user_login, { delay: 20 });
    await page.waitForSelector(SIGAA_PATHS.passSelector);
    await page.type("input[type=password]", pass_login, { delay: 20 });
    await page.click(SIGAA_PATHS.submitSelector);
  }

  async goToHome(page) {
    await page.waitForSelector("#portais")
    await page.click("#portais > ul > li.discente.on > a");
    await page.waitForSelector("#cmAction-0");
  }

  async goToProgress(page) {
    await page.waitForSelector("#cmAction-0");
    await page.hover("#cmAction-0");
    await page.hover("#cmAction-8 > td.ThemeOfficeMenuFolderText");
    await page.hover("#cmAction-9 > td.ThemeOfficeMenuItemText");
    await page.click("#cmAction-9 > td.ThemeOfficeMenuItemText");
    await page.waitForSelector("#svgContainerObrigatorias");
  }

  async goToClassRoom(page) {
    await page.waitForSelector("#cmAction-0");
    await page.hover("#cmAction-0");
    await page.hover("#cmAction-39 > td.ThemeOfficeMenuFolderText");
    await page.hover("#cmAction-41 > td.ThemeOfficeMenuItemText");
    await page.click("#cmAction-41 > td.ThemeOfficeMenuItemText");
    await page.waitForSelector("#form > table");
  }

  async goToClassRoomSearch(page, codCurso) {
    await page.waitForSelector("#form > table");

    await page.waitForSelector("#form\\:inputAno");
    await page.click("#form\\:inputAno", { clickCount: 2 });
    await page.type("#form\\:inputAno", "2023", { delay: 20 }); // change year
    await page.waitForSelector("#form\\:inputPeriodo");
    await page.click("#form\\:inputPeriodo", { clickCount: 2 });
    await page.type("#form\\:inputPeriodo", "2", { delay: 20 }); // change period

    await page.click("#form\\:checkUnidade");
    await page.click("#form\\:checkCurso");
    await page.click("#form\\:selectCurso");
    await page.select("#form\\:selectCurso", codCurso);
    await page.click("#form\\:buttonBuscar");

    await page.waitForSelector("#lista-turmas");
  }

  closeBrowser() {
    this.browser.close();
  }
}

module.exports = { Puppeteer, LAUNCH_PUPPETEER_OPTS, PAGE_PUPPETEER_OPTS }