class RegexExtractor {
  extractPeriodo(string) {
    const patter = /g_periodo_(\d+)_cc_\d+/;
    const result = string.match(patter);
    if (result && result[1]) return result[1];
  }

  cleanTurmas(text) {
    text = text.replace(/\s{2,}/g, ' ');
    text = text.replace(/^.*Processamento da Matrícula.*$\n?/gm, '')
    text = text.replace(/^\s*$/gm, '');
    return text;
  }

  splitForObject(arr) {
    const data = {}
    extractCodeAndName(arr[0], data);
    extractPeriod(arr[1], data);
    extractClassroom(arr[2], data);
    extractDocentAndCH(arr[3], data);
    extractType(arr[4], data);
    extractSituation(arr[5], data);
    extractHorarios(arr[6], data);
    extractLocal(arr[7], data);
    // console.log(arr[8]); // alunos inscritos|total
    return data;
  }
}

function extractCodeAndName(string, data) {
  const patter = /[A-Z]{3,}\d{4,}/;
  const code = string.match(patter);
  [data["code"]] = code;
  string = string.replace(code, "");
  string = string.replace(" (GRADUAÇÃO)", "");
  name = string.replace(" - ", "");
  data["name"] = name;
}

function extractPeriod(string, data) {
  data["period"] = string;
}

function extractClassroom(string, data) {
  data["classroom"] = string;
}

function extractDocentAndCH(string, data) {
  const pattern = /([A-Z][A-Z\s]+?) \(\d+h\)/g;
  docents = string.match(pattern);
  data["docents"] = docents;
}

function extractType(string, data) {
  data["type"] = string;
}

function extractSituation(string, data) {
  data["situation"] = string;
}

function extractHorarios(string, data) {
  const pattern = /([A-Z]{3} \d{2}:\d{2}-\d{2}:\d{2})/g;
  data["schedule"] = string.match(pattern);
}

function extractLocal(string, data) {
  data["local"] = string;
}

module.exports = { RegexExtractor }