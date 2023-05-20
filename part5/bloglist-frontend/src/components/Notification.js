import PropTypes from 'prop-types'

const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }

  const notificationClass = type === 'success'
    ? 'success'
    : 'error'

  return (
    <div className={notificationClass}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
}

export default Notification