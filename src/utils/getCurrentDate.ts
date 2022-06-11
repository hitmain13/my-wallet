const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const formattedDay = day > 9 ? `${day}` : `0${day}`
    const formattedMonth = month > 9 ? `${month}` : `0${month}`
    return `${year}-${formattedMonth}-${formattedDay}`
}
export default getCurrentDate