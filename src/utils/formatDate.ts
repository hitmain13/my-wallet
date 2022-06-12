const formatDate = (date: string): string => {
    const formattedDate = new Date(date)
    formattedDate.setDate(formattedDate.getDate() + 1)
    return Intl.DateTimeFormat('pt-br').format(formattedDate)
}

export default formatDate;