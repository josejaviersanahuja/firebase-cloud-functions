/* eslint-disable @typescript-eslint/no-explicit-any */
import admin from "firebase-admin";
import {storage} from "firebase-functions/v1";
import {basename, join} from "path";
import os from "os";
import vision from "@google-cloud/vision";

export const validarImagenController = (
    objImage: storage.ObjectMetadata,
    // context: EventContext,
) => {
  if (!objImage.name?.match(/images/)) {
    console.log("La imagen no aparece en la ubicación esperada");
    return;
  }
  if (!objImage.contentType?.startsWith("image/")) {
    console.log("La imagen no tiene el content type adecuado");
    return;
  }
  console.log("si hay un objeto válido");
  validarImagenHelper(objImage);
};

const validarImagenHelper = (objImage: storage.ObjectMetadata) => {
  const rutaArchivo = objImage.name || "";
  const nombreArchivo = basename(rutaArchivo);
  console.log(nombreArchivo);
  const plid = nombreArchivo.split(".")[0];
  console.log(plid, "es realmente el plid?");
  const bucket = admin.storage().bucket();
  const tmpRutaArchivo = join(os.tmpdir(), nombreArchivo);

  const cliente = new vision.ImageAnnotatorClient();

  return bucket
      .file(rutaArchivo)
      .download({
        destination: tmpRutaArchivo,
      })
      .then(() => {
        return cliente.safeSearchDetection(tmpRutaArchivo);
      })
      .then((resultado) => {
        const adulto: any = resultado[0].safeSearchAnnotation?.adult;
        const violence: any = resultado[0].safeSearchAnnotation?.violence;
        const medical: any = resultado[0].safeSearchAnnotation?.medical;
        return (
          esAdecuada(adulto) &&
          esAdecuada(medical) &&
          esAdecuada(violence)
        );
      })
      .then((resp) => {
        if (resp) {
          return resp;
        }
        console.log("DEBES BORRAR LA IMAGEN Y UPDATE PLID PARA BORRAR IMGURL");
        return false;
      });
};

/**
 * funcion que recibe el resultado de vision y lo traduce a boolean
 * @param {any} resultado de la api vision
 * @return {boolean} si es adecuada la imagen o no
 */
function esAdecuada(resultado: any) {
  return (
    resultado !== "POSSIBLE" &&
    resultado !== "LIKELY" &&
    resultado !== "VERY_LIKELY"
  );
}
