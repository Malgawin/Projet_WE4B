import { FormControl } from "@angular/forms";

function checkDate(control: FormControl): { [key: string]: boolean } | null {
  const date = new Date(control.value);
  const today = new Date();
  if (date < today) {
    return { checkDate: true };
  }
  return null;
}

export { checkDate };