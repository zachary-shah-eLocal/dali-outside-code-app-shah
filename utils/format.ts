import { capitalize } from 'lodash'
import { isProduction } from './isProduction'

import { addHours, getMinutes, getHours, getSeconds, format as formatDate } from 'date-fns'
import { number } from 'yup'

export const DEFAULT_DATE_FORMAT = 'yyyy-LL-dd'

const formatters = {
  campaignDetailsType: (value = '') => {
    return value
      .replace(/_/g, ' ')
      .split(/[\s-]/)
      .map((section) => capitalize(section))
      .join(' ')
  },

  campaignType: (value = '') => {
    return value === 'call' ? 'Call' : 'Lead'
  },

  currency: (value: string | number | bigint | null | undefined) => {
    if (value === null || value === undefined || value === '') {
      value = 0
    }
    if (typeof value === 'boolean' || isNaN(value as number)) {
      console.warn('Can only pass numbers to format currency')
      return isProduction ? '' : `${value} is an invalid value format currency`
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value as number)
  },

  phoneNumber: (value: string) => {
    if (!value) return ''
    const cleaned = ('' + value).replace(/\D/g, '')
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      const intlCode = match[1] ? '+1 ' : ''
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return value
  },

  boolean: (value: any) => {
    if (typeof value !== 'boolean') {
      console.warn('Must pass a boolean to format boolean')
      return isProduction ? '' : `${value} is an invalid value to format boolean`
    }

    return value ? 'Yes' : 'No'
  },
  seconds: (value: string | number) => {
    if (value === '-') {
      return value
    }
    if (typeof value === 'boolean' || isNaN(value as number)) {
      console.warn('Can only pass numbers to format secconds')
      return isProduction ? '' : `${value} is an invalid value format seconds`
    }
    const normalizeTime = (time: string | any[]) => (time.length === 1 ? `0${time}` : time)

    const SECONDS_TO_MILLISECONDS_COEFF = 1000
    const MINUTES_IN_HOUR = 60

    const milliseconds = value as number * SECONDS_TO_MILLISECONDS_COEFF

    const date = new Date(milliseconds)
    const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR
    const dateWithoutTimezoneDiff = addHours(date, timezoneDiff)

    const hours = normalizeTime(String(getHours(dateWithoutTimezoneDiff)))
    const minutes = normalizeTime(String(getMinutes(dateWithoutTimezoneDiff)))
    const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)))

    const hoursOutput = hours !== '00' ? `${hours}:` : ''

    return `${hoursOutput}${minutes}:${seconds}`
  },

  date: (value: string | number | Date, formatString: any) => {
    if (!formatString) {
      throw new Error('Must provide format string')
    }
    return value ? formatDate(new Date(value), formatString) : ''
  }
}

export default formatters