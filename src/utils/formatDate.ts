const formatDate = (date: string): string => {
    const formattedDate = new Date(date)
    formattedDate.setDate(formattedDate.getDate())
    return Intl.DateTimeFormat('pt-br').format(formattedDate)
}

export default formatDate;