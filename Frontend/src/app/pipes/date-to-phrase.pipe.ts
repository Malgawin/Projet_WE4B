import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToPhrase'
})
export class DateToPhrasePipe implements PipeTransform {
  transform(dateStr?: string): string {

    // Si la date n'est pas fournie, retourner une chaîne vide
    if (!dateStr) return '';

    // Convertir la chaîne de date en objet Date
    const date = new Date(dateStr);

    // options pour formater la date
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // jour de la semaine
      day: '2-digit',  // jour format : 00
      month: '2-digit', // mois : 00
      year: 'numeric',  // anne : 2000
      hour: '2-digit',  // heure : 00
      minute: '2-digit',// minute : 00
      hour12: false // format 24h 
    };

    //formatage selon options definies
    const format = new Intl.DateTimeFormat('fr-FR', options);
    const split = format.formatToParts(date);

    // extraction des parties de la date
    const jourSemaine = split.find(p => p.type === 'weekday')?.value || '';
    const day = split.find(p => p.type === 'day')?.value || '';
    const month = split.find(p => p.type === 'month')?.value || '';
    const year = split.find(p => p.type === 'year')?.value || '';
    const hour = split.find(p => p.type === 'hour')?.value || '';
    const minute = split.find(p => p.type === 'minute')?.value || '';

    // Calcul du temps écoulé depuis la date donnée
    //recupere la date actuelle
    const now = new Date();

    let diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    const days = Math.floor(diff / (3600 * 24)); // jours écoulés
    diff -= days * 3600 * 24;
    const hours = Math.floor(diff / 3600); // heures écoulés
    diff -= hours * 3600;
    const minutes = Math.floor(diff / 60); // minutes écoulées
    const seconds = diff - minutes * 60; //secondes écoulés

    // Construction de la phrase finale
    let timePast = 'il y a ';
    if (days > 0) timePast += `${days}J `;
    if (hours > 0) timePast += `${hours}h `;
    if (minutes > 0) timePast += `${minutes}min `;
    if (seconds > 0) timePast += `${seconds}s`;
    if (timePast === 'il y a ') timePast += '0s';

    return `${jourSemaine} ${day}/${month}/${year} à ${hour}h${minute} (${timePast.trim()})`; 
  }
}