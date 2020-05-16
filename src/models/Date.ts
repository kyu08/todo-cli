import format from "date-fns/format";

export const returnDate = () => (
  format(new Date(), "yyyy/M/d H:mm")
);
