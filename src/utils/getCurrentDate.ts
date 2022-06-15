import dateFormat from 'dateformat'

const getCurrentDate = () => {
    const now = new Date();
    return dateFormat(now, "isoDate")
}

export default getCurrentDate;