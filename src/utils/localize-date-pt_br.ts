export function localizeDatePtBr(date: string) {
  if(date.trim().length > 0) {
    const dateObj = new Date(`${date} 00:00:00`);

    let dateString = dateObj.toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'long',
    }).replace(/\//g, ' de ')
  
    return dateString;
  }
}