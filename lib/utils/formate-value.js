export function $_formatValue(curValue, oldValue, type, curPos = 0) {
  const isAdd = oldValue.length > curValue.length ? -1 : 1
  let formatValue = { value: curValue, range: curPos }
  // default format by component
  let gap = ' '
  switch (type) {
    case 'bankCard':
      curValue = trimValue(curValue.replace(/\D/g, ''))
      formatValue = formatValueByGapStep(4, curValue, gap, 'left', curPos, isAdd, oldValue)
      break
    case 'phone':
      curValue = trimValue(curValue.replace(/\D/g, ''))
      formatValue = formatValueByGapRule('3|4|4', curValue, gap, curPos, isAdd)
      break
    case 'money':
      gap = ','
      curValue = trimValue(curValue.replace(/[^\d.]/g, ''))
      const dotPos = curValue.indexOf('.')
      // format if no dot or new add dot or insert before dot
      const moneyCurValue = curValue.split('.')[0]
      const moneyCurDecimal = ~dotPos ? `.${curValue.split('.')[1]}` : ''

      formatValue = formatValueByGapStep(
        3,
        trimValue(moneyCurValue, gap),
        gap,
        'right',
        curPos,
        isAdd,
        oldValue.split('.')[0],
      )
      formatValue.value += moneyCurDecimal
      break
    default:
      break
  }
  return formatValue
}

export function formatValueByGapRule(gapRule, value, gap = ' ', range, isAdd = 1) {
  const arr = value ? value.split('') : []
  let showValue = ''
  const rule = []
  gapRule.split('|').some((n, j) => {
    rule[j] = +n + (rule[j - 1] ? +rule[j - 1] : 0)
  })
  let j = 0
  arr.some((n, i) => {
    // Remove the excess part
    if (i > rule[rule.length - 1] - 1) {
      return
    }
    if (i > 0 && i === rule[j]) {
      showValue = showValue + gap + n
      j++
    } else {
      showValue = showValue + '' + n
    }
  })
  let adapt = 0
  rule.some((n, j) => {
    if (range === +n + 1 + j) {
      adapt = 1 * isAdd
    }
  })
  range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adapt) : showValue.length
  return { value: showValue, range: range }
}

export function formatValueByGapStep(step, value, gap = ' ', direction = 'right', range, isAdd = 1, oldValue = '') {
  if (value.length === 0) {
    return { value, range }
  }

  const arr = value && value.split('')
  let _range = range
  let showValue = ''

  if (direction === 'right') {
    for (let j = arr.length - 1, k = 0; j >= 0; j--, k++) {
      const m = arr[j]
      showValue = k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue
    }
    if (isAdd === 1) {
      // 在添加的情况下，如果添加前字符串的长度减去新的字符串的长度为2，说明多了一个间隔符，需要调整range
      if (oldValue.length - showValue.length === -2) {
        _range = range + 1
      }
    } else {
      // 在删除情况下，如果删除前字符串的长度减去新的字符串的长度为2，说明少了一个间隔符，需要调整range
      if (oldValue.length - showValue.length === 2) {
        _range = range - 1
      }
      // 删除到最开始，range 保持 0
      if (_range <= 0) {
        _range = 0
      }
    }
  } else {
    arr.some((n, i) => {
      showValue = i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n
    })
    const adapt = range % (step + 1) === 0 ? 1 * isAdd : 0
    _range = typeof range !== 'undefined' ? (range === 0 ? 0 : range + adapt) : showValue.length
  }

  return { value: showValue, range: _range }
}

export function trimValue(value, gap = ' ') {
  value = typeof value === 'undefined' ? '' : value
  const reg = new RegExp(gap, 'g')
  value = value.toString().replace(reg, '')
  return value
}
