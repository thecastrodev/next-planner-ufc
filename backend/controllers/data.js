import {getDisciplinas, getTurmas} from "../src/index.js";

export const loginSigaa = (_, res) => {
  //todo autenticacao
  return res.status(200).json("Login efetuado com sucesso")
}

export const getDisciplinasCursadas = async (_, res) => {
  try {
    const dados = await getDisciplinas()

    const disciplinasCursadas = dados.filter(item => item.status != "a_cursar")

    return res.status(200).json({status: "OK", success: true, disciplinasCursadas})
  }
  catch {
    return res.status(500).json({status: "Internal Server Error", success: false})
  }
  
}

export const getDisciplinasPendentes = async (_, res) => {
  try {
    const dados = await getDisciplinas()

    const disciplinasPendentes = dados.filter(item => item.status === "a_cursar")

    return res.status(200).json({status: "OK", success: true, disciplinasPendentes})
  }
  catch {
    return res.status(500).json({status: "Internal Server Error", success: false})
  }
  
}

export const getTurmasSemestre = async (_, res) => {
  try {
    const turmas = await getTurmas()

    return res.status(200).json({status: "OK", success: true, turmas})
  }
  catch {
    return res.status(500).json({status: "Internal Server Error", success: false})
  }
}