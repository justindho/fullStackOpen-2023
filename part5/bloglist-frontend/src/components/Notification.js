const Notification = ({type, message}) => {
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

export default Notification