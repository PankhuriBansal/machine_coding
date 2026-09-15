import './styles.css'
import useNotifications from './hooks/useNotifications'

const Toasts = () => {
  const { NotificationComponent, triggerNotifications } =
    useNotifications('top-right')
  return (
    <div className='toast-heading'>
      <h1>Toast Component</h1>
      <button
        onClick={() =>
          triggerNotifications({
            type: 'success',
            message: 'file sent successfully',
            duration: 3000
          })
        }
      >
        Trigger Success
      </button>
      <button
        onClick={() =>
          triggerNotifications({
            type: 'error',
            message: 'file sent failed',
            duration: 3000
          })
        }
      >
        Trigger Error
      </button>
      {/* <Notifications type="success" message={"new"}/> */}
      {NotificationComponent}
    </div>
  )
}

export default Toasts
