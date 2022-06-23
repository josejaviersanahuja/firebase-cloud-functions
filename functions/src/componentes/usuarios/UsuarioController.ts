import {UserRecord} from "firebase-functions/v1/auth";
import {UsuarioAdmin} from "./UsuarioAdmin";

/**
 * Recibe el evento de creación de un nuevo usuario.
 * Ejecuta un envío de email al nuevo usuario para verificar su email
 * @param {userUserRecord} usuario El que dispara el evento
 * @return {Promise<any>} Promesa con el envío de un email
 */
export const usuarioCreacionController = (usuario: UserRecord) => {
  const usuarioAdmin = new UsuarioAdmin();

  return usuarioAdmin
      .enviarEmailBienvenida(usuario.displayName, usuario.email)
      .then(() => {
        return usuarioAdmin.registrarEmailsUsuario(
            usuario.displayName,
            usuario.email
        );
      })
      .catch((error) => {
        console.error(`Error en la creación de usuario => ${error}`);
      });
};

export const usuarioEliminadoController = (usuario: UserRecord) => {
  const usuarioAdmin = new UsuarioAdmin();

  return usuarioAdmin
      .enviarEmailDespedida(usuario.displayName, usuario.email)
      .catch((error) => {
        console.error(`Error en la creación de usuario => ${error}`);
      });
};

export const creacionUsuarioCRMController = (usuario: UserRecord) => {
  const usuarioAdmin = new UsuarioAdmin();
  return usuarioAdmin.sincronizarCRM(
      usuario.displayName,
      usuario.displayName,
      usuario.email
  );
};
