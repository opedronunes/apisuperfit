import express from "express";
import {LoginController} from "./controllers/LoginController";
import {authMiddleware} from "./middlewares/authMiddleware";
import {PessoaController} from "./controllers/PessoaController";
import {ModalidadeController} from "./controllers/ModalidadeController";
import {PlanoController} from "./controllers/PlanoController";
import {HrAulaController} from "./controllers/HrAulaController";
import {MatriculaController} from "./controllers/MatriculaController";
import {PagamentoController} from "./controllers/PagamentoController";

export const router = express.Router();

router.post("/users", new PessoaController().createUser);
router.post("/login", new LoginController().login);

router.use(authMiddleware);
router.get("/users", new PessoaController().getAllUsers);
router.get("/users/:id", new PessoaController().findIdUser);
router.put("/users/:id", new PessoaController().updateUser); 
router.delete("/users/:id", new PessoaController().deleteUser);

//Modalidades
router.get("/modalidades", new ModalidadeController().AllModalidades);
router.post("/modalidades", new ModalidadeController().createModalidade);

//Planos
router.get("/planos", new PlanoController().AllPlanos);
router.post("/planos", new PlanoController().createPlanos);
router.put("/planos/:id", new PlanoController().updatePlanos);
router.delete("/planos/:id", new PlanoController().deletePlano);

//Horários-aulas
router.get("/aulas", new HrAulaController().AllHrAulas);
router.post("/aulas", new HrAulaController().createHrAulas);
router.put("/aulas/:id", new HrAulaController().updateHrAulas);
router.delete("/aulas/:id", new HrAulaController().deleteHrAula);

//Matrícula
router.get("/matriculas", new MatriculaController().AllMatriculas);
router.post("/matriculas", new MatriculaController().createMatriculas);
router.get("/matriculas/:id", new MatriculaController().matriculaId);
router.put("/matriculas/:id", new MatriculaController().updateMatricula);
// router.delete("/matriculas/:id", new MatriculaController() );

//Pagamentos
router.get("/pagamentos", new PagamentoController().AllPagamentos);
router.post("/pagamentos", new PagamentoController().createPagamentos);
router.get("/adimplencia/:id", new PagamentoController().adimplencia );
// router.put("/matriculas/:id", new );
