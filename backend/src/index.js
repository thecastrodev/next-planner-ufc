require("dotenv").config();
const { Extractor } = require('./handlers/Extractor');
const { Puppeteer } = require('./libs/Puppeteer');

const LOGIN = {
  user: process.env.USER_LOGIN || "username",
  pass: process.env.PASS_LOGIN || "password"
}

const COD_CURSO = "657484";

const p = new Puppeteer();
const e = new Extractor();
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

(async function main() {
  await p.initBrowser();

  page = await p.getNewPage();
  await p.goTo(page, "https://si3.ufc.br/sigaa/verTelaLogin.do");
  await p.doLogin(page, LOGIN.user, LOGIN.pass);

  await p.goTo(page, "https://si3.ufc.br/sigaa/paginaInicial.do");
  await p.goToHome(page);
  await p.goToProgress(page);
  console.log(await e.extractProgress(page)); // Array de Progresso

  await p.goTo(page, "https://si3.ufc.br/sigaa/paginaInicial.do");
  await p.goToHome(page);
  await p.goToClassRoom(page);
  await p.goToClassRoomSearch(page, COD_CURSO);
  console.log(await e.extractClassRooms(page)); // Array de Disciplinas

  await sleep(3000);
  p.closeBrowser();
})();
