const getCurrentDate = () => {
    const atualDate = new Date();
    const year = atualDate.getFullYear();
    const month = atualDate.getMonth() + 1;
    const day = atualDate.getDay();
    const formattedDay = day > 9 ? `${day}` : `0${day}`
    const formattedMonth = month > 9 ? `${month}` : `0${month}`
    return `${year}-${formattedMonth}-12`
}
export default getCurrentDate