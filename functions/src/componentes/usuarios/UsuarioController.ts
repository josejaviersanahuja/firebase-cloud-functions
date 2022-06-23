import {UserRecord} from "firebase-functions/v1/auth";
import {UsuarioAdmin} from "./UsuarioAdmin";

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
