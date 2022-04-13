/**
 * @param {string} date 
 * @returns {string}
 */
 export function dateDiff(date){
  const timeDiff = Date.now() - new Date(date).getTime();
  
  const diffSeconds = Math.floor(timeDiff / 1000);
  if(diffSeconds < 60){
    return `il y'a ${diffSeconds.toString()}s`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `il y'a ${diffMinutes.toString()}min`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `il y'a ${diffHours.toString()}h`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7){
    return `il y'a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  }
  
  return `Le ${new Date(date).toLocaleDateString()}`;
}