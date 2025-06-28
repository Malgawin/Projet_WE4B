import { FormControl } from "@angular/forms";

function checkFileExtension(control: FormControl): { [key: string]: boolean } | null {
  const allowedExtensions = ['.pdf'];
  const fileName = control.value;
  const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
  return hasValidExtension ? null : { checkFileExtension: true };
}

export { checkFileExtension };