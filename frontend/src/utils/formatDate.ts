import dateFormat from 'dateformat'

const formatDate = (date: string): string => {
    const pickedDate = new Date(date);
    pickedDate.setDate(pickedDate.getDate() -1)
    return dateFormat(pickedDate, "dd/mm/yyyy");
}

export default formatDate;