import React, { useEffect } from 'react'
import moment from 'moment/moment'
const FormatDate = ({date}) => {
  return (
    <div>{moment(date).format('DD/MM/Y (hh:mm A)')}</div>
  )
}

export default FormatDate