import { AbstractControl, ValidationErrors } from "@angular/forms";


export function validarUlr(control:AbstractControl):ValidationErrors | null{
    const valor = control.value;
    if (valor && !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(valor)) {
        return {
        urlInvalida: true,
        mensaje: "La URL no es válida (debe empezar con http o https)"};
    }
    return null;
}

export function validarExperiencia(control:AbstractControl):ValidationErrors |null{
    const valor = control.value;
    if(valor && !valor.toLocaleLowerCase().endsWith('años')){
        return{campoInvalido:true, mensaje:"El campo debe finalizar con la palabra años"}
    }
    return null;
}

export function validarCorreo(control:AbstractControl):ValidationErrors |null{
    const valor = control.value;
    if(valor && !valor.toLocaleLowerCase().endsWith('gmail.com')){
        return{DominioInvalido:true, mensaje:"Dominio no es el correcto"}
    }
    return null;
}