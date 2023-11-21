require("dotenv").config();
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const USERNAME_SELECTOR = "#conteudo > table > tbody > tr > td > div > form > table > tbody > tr:nth-child(1) > td > input[type=text]";
const PASSWORD_SELECTOR = "#conteudo > table > tbody > tr > td > div > form > table > tbody > tr:nth-child(2) > td > input[type=password]";
const CTA_SELECTOR = "#conteudo > table > tbody > tr > td > div > form > table > tfoot > tr > td > input[type=submit]";
const COD_CURSO = "657484";
const ANO = "2023";
const PERIODO = "1";

arrayProgress = []

async function startBrowser() {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [`--window-size=1040,800`],
    defaultViewport: {
      width: 1040,
      height: 800,
    },
  });
  const page = await browser.newPage();

  return { browser, page };
}

async function closeBrowser(browser) {
  return browser.close();
}

async function login(page, user_login, pass_login) {
  await page.waitForSelector("#conteudo");
  await page.click("#conteudo");
  await page.waitForSelector(USERNAME_SELECTOR);
  await page.type("input[type=text]", user_login || "username", { delay: 20 });
  await page.waitForSelector(PASSWORD_SELECTOR);
  await page.type("input[type=password]", pass_login || "password", { delay: 20 });
  await page.click(CTA_SELECTOR);
}

async function enterHome(page) {
  await page.goto("https://si3.ufc.br/sigaa/paginaInicial.do");
  await page.click("#portais > ul > li.discente.on > a");
}

async function enterProgressCourse(page) {
  await page.waitForSelector("#cmAction-0");
  await page.hover("#cmAction-0");
  await page.hover("#cmAction-8 > td.ThemeOfficeMenuFolderText");
  await page.hover("#cmAction-9 > td.ThemeOfficeMenuItemText");
  await page.click("#cmAction-9 > td.ThemeOfficeMenuItemText");

  await page.waitForSelector("#svgContainerObrigatorias");
}

async function enterClassRoom(page) {
  await page.waitForSelector("#cmAction-0");
  await page.hover("#cmAction-0");
  await page.hover("#cmAction-39 > td.ThemeOfficeMenuFolderText");
  await page.hover("#cmAction-41 > td.ThemeOfficeMenuItemText");
  await page.click("#cmAction-41 > td.ThemeOfficeMenuItemText");
}

async function enterClassRoomSearch(page, ano, periodo, codCurso) {
  await page.waitForSelector("#form > table");

  await page.waitForSelector("#form\\:inputAno");
  await page.click("#form\\:inputAno", { clickCount: 2 });
  await page.type("#form\\:inputAno", ano, { delay: 20 });
  await page.waitForSelector("#form\\:inputPeriodo");
  await page.click("#form\\:inputPeriodo", { clickCount: 2 });
  await page.type("#form\\:inputPeriodo", periodo, { delay: 20 });

  await page.click("#form\\:checkUnidade");
  await page.click("#form\\:checkCurso");
  await page.click("#form\\:selectCurso");
  await page.select("#form\\:selectCurso", codCurso);
  await page.click("#form\\:buttonBuscar");

  await page.waitForSelector("#lista-turmas");
}

function extractPeriodo(string) {
  const patter = /g_periodo_(\d+)_cc_\d+/;
  const result = string.match(patter);
  if (result && result[1]) return result[1];
}

async function extractProgress(page) {
  const html = await page.evaluate(
    () => { return document.documentElement.innerHTML }
  );

  const $ = cheerio.load(html);

  $("#progressoObrigatorias > g").each((index, element) => {
    let code, periodo, progress
    code = $(element).text().trim()
    periodo = extractPeriodo($(element).attr('id').trim())
    progress = $(element).children(0).attr('class').trim()
    if (progress != "cabecalho") arrayProgress.push({ code, periodo, progress })
  });
}

async function start(url) {
  const { browser, page } = await startBrowser();
  await page.goto(url);

  await login(page, process.env.USER_LOGIN, process.env.PASS_LOGIN);

  await enterHome(page);
  await enterProgressCourse(page);
  await extractProgress(page);

  console.log(arrayProgress);

  await enterHome(page);

  await enterClassRoom(page);
  await enterClassRoomSearch(page, ANO, PERIODO, COD_CURSO);

  await sleep(3000);
  closeBrowser(browser);
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

(async () => {
  await start("https://si3.ufc.br/sigaa/verTelaLogin.do");
})();
