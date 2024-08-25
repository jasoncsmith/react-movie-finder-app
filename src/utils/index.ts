const pluralize = (str: string | number) => {
  const val = +str
  return val === 1 ? '' : 's'
}

const transformDuration = (duration: string | undefined) => {
  if (!duration) return '0 Hours 0 Minutes'
  const parts = duration.replace('PT', '').replace('M', '').split('H')
  return `${parts[0]} Hour${pluralize(parts[0])} ${parts[1]} Minute${pluralize(parts[1])}`
}

const transformDate = (dateString: Date) => {
  const date = new Date(dateString + 'T00:00:00Z')
  console.log(dateString)
  return `
    ${String(date.getUTCMonth() + 1).padStart(2, '0')}/${String(date.getUTCDate()).padStart(
    2,
    '0'
  )}/${date.getUTCFullYear()}`
}

export { pluralize, transformDuration, transformDate }
