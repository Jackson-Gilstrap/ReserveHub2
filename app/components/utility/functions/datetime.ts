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
    let tempArr = date.split("T");
    return tempArr[0];
  };