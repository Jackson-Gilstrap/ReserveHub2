export const formattedISOnoTime = (dateString: string) => {
    const date = new Date(`${dateString}T00:00:00`);

    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const fullDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return `${day}, ${fullDate}`


};

export const formatDate = (date: string) => {
    const tempArr = date.split("T");
    return tempArr[0];
  };


 export  function militaryToRegularTime(militaryTime: string) {
    // Split the time string into hours and minutes
    const [hours, minutes] = militaryTime.split(':').map(Number);
  
    // Check if the time is valid
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return "Invalid time";
    }
  
    // Determine AM/PM
    const period = hours < 12 ? "AM" : "PM";
  
    // Convert hours to 12-hour format
    const regularHours = hours % 12 || 12;
  
    // Format the time string
    return `${regularHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }