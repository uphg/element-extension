export const excludes = {
  account: /[^\w]/g,
  password: /[\u4E00-\u9FA5\s]/g,
  phone: /^0|[^\d]/g,
  number: /[^\d]/g,
  IDCard: /[^0-9Xx]/g,
  money: /^0|[^\d.]/g,
  email: /[^a-zA-Z0-9@._-]/g,
  numberOrLetter: /[^a-zA-Z0-9]/g
}