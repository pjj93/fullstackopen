const Notification = ({ notification }) => (
  <div className={notification.type}>
    {notification.message}
  </div>
)

export default Notification