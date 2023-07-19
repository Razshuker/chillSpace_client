import React from 'react'

export default function TimeDiff(props) {
    const data = props.data;
    
const getTimePassed = (date) => {
    const now = new Date().getTime();
    const pastDate = new Date(date).getTime();
    const timeDiff = now - pastDate;


    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years >= 1) {
        return `${years}y ago`;
    } else if (months >= 1) {
        return `${months}m ago`;
    } else if (days >= 1) {
        return `${days}d ago`;
    } else if (hours >= 1) {
        return `${hours}h ago`;
    } else if (minutes >= 1) {
        return `${minutes}m ago`;
    }
    return `${seconds}s ago`;
}

  return (
   
   <span>{getTimePassed(data)}</span> 
  )
}


