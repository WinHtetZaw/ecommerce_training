const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 0,
})

export function formatCurrency(amount: number, isInCents = true) {
    return isInCents ? CURRENCY_FORMATTER.format(amount / 100) : CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function formatNumber(amount: number) {
    return NUMBER_FORMATTER.format(amount)
}