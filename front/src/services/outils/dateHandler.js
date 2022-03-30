/**
 * @param {string} date 
 * @returns {string}
 */
 export function dateDiff(date){
  const timeDiff = Date.now() - new Date(date).getTime();
  
  const diffSeconds = Math.floor(timeDiff / 1000);
  if(diffSeconds < 60){
    return `${diffSeconds.toString()}s`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes.toString()}min`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours.toString()}h`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7){
    return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  }
  
  return `Le ${new Date(date).toLocaleDateString()}`;
}

// /**
//  * @param {string} date 
//  * @returns {string}
//  */
// export function dateDiff(date){
//   const timeDiff = Date.now() - new Date(date).getTime();
//   if(Math.floor(timeDiff/1000) < 60){
//     return `${Math.floor(timeDiff / 1000).toString()}s`;
//   }
//   if (Math.floor((timeDiff/1000)/60) < 60) {
//     return `${Math.floor((timeDiff / 1000)/60).toString()}min`;
//   }

//   if (Math.floor((timeDiff/60000)/60) < 24) {
//     return `${Math.floor((timeDiff / 60000)/60).toString()}h`;
//   }

//   if (Math.floor((timeDiff/60000)/60/24 < 7)){
//     let days = Math.floor((timeDiff/60000)/60/24);
//     return `${days} jour${days > 1 ? 's' : ''}`;
//   }
  
//   return new Date(date).toLocaleDateString();
// }
