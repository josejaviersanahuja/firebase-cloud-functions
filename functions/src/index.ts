import {auth, logger, https} from "firebase-functions";
import {initializeApp, firestore} from "firebase-admin";
import {
  usuarioCreacionController,
  usuarioEliminadoController,
  creacionUsuarioCRMController,
} from "./componentes/usuarios/UsuarioController";

initializeApp();
firestore().settings({timestampsInSnapshots: true});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = https.onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const creacionUsuario = auth.user()
    .onCreate((user) => usuarioCreacionController(user));

export const eliminacionUsuario = auth.user()
    .onDelete(usuarioEliminadoController);

export const creacionUsuarioCRM = auth.user()
    .onCreate(creacionUsuarioCRMController);
