

export const formattedISOnoTime = (dateString: string) => {
  // Split the string into [year, month, day]
  const [year, month, day] = dateString.split('-').map(Number);
  
  // Create a Date object. Note: month is zero-indexed (0 = January, 1 = February, etc.)
  const date = new Date(year, month - 1, day);
  
  // Get the weekday name (e.g., "Tuesday")
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  
  // Get the full date in the format "Month day, year" (e.g., "February 4, 2025")
  const fullDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log( "formattedisonotime",`${weekday}, ${fullDate}`)
  return `${weekday}, ${fullDate}`;
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