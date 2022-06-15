import dateFormat from 'dateformat'

const formatDate = (date: string): string => {
    const pickedDate = new Date(date);
    return dateFormat(pickedDate, "dd/mm/yyyy");
}

export default formatDate;