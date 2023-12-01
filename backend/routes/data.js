import express from 'express';
import { loginSigaa, getDisciplinasCursadas, getTurmasSemestre, getDisciplinasPendentes } from '../controllers/data.js';

const router = express.Router();

//login
router.get('/login', loginSigaa)

// disciplinas, turmas
router.get('/getDisciplinasCursadas', getDisciplinasCursadas)
router.get('/getDisciplinasPendentes', getDisciplinasPendentes)
router.get('/getTurmas', getTurmasSemestre)

export default router;