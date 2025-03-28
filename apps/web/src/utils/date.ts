export const getDateMonthsAgo = (months: number): string => {
  const today = new Date();
  today.setMonth(today.getMonth() - months);
  return today.toISOString().split("T")[0]!; // Format as YYYY-MM-DD
};
