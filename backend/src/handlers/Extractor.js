const cheerio = require("cheerio");
const { RegexExtractor } = require("./RegexExtractor");

const arrayProgress = []
const arrayTurmas = []

const re = new RegexExtractor();

class Extractor {
  async extractProgress(page) {
    const $ = await extractHTML(page);
    getObrigatorias($);
    getOptativas($);

    return arrayProgress;
  }

  async extractClassRooms(page) {
    const $ = await extractHTML(page);
    let rawArray = []
    getTurmas($, rawArray);

    for (const arr of rawArray) {
      arrayTurmas.push(re.splitForObject(arr));
    }

    return arrayTurmas;
  }
}

async function extractHTML(page) {
  const html = await page.evaluate(
    () => { return document.documentElement.innerHTML }
  );
  return cheerio.load(html);
}

function getObrigatorias($) {
  $("#progressoObrigatorias > g").each((index, element) => {
    let code, period, status
    code = $(element).text().trim()
    period = Number(re.extractPeriodo($(element).attr('id').trim()))
    status = $(element).children(0).attr('class').trim()
    if (status != "cabecalho") arrayProgress.push({ code, period, status })
  });
}

function getOptativas($) {
  $("#progressoOptativas > g").each((index, element) => {
    let code, status
    code = $(element).text().trim()
    status = $(element).children(0).attr('class').trim()
    arrayProgress.push({ code, status })
  });
}

function getTurmas($, rawArray) {
  let temp = [], controller = 0;
  $("#lista-turmas > tbody > tr > td").each((index, element) => {
    td = $(element).text().trim()
    td = re.cleanTurmas(td);
    if (td && controller != 9) {
      temp.push(td);
      controller++;
    } else {
      if (temp.length !== 0) rawArray.push(temp);
      temp = [];
      controller = 0;
    }
  })
  fixLinesWithoutHeader(rawArray);
}

function fixLinesWithoutHeader(array) {
  for (let i = 0; i < array.length; i++) {
    let e = array[i];
    let tot = e.length;
    if (tot === 8) e = e.unshift(array[i - 1][0]);
  }
}

module.exports = { Extractor }