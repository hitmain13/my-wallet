const formatCurrency = (current: number): string => {
    return current.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
}

export default formatCurrency;