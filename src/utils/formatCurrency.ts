const CURRENCY_FORMATTER = new Intl.NumberFormat("en-ZA", {
    currency: "ZAR",
    style: "currency",
});

export const formatCurrency = (number: number) => {
    return CURRENCY_FORMATTER.format(number);
};
