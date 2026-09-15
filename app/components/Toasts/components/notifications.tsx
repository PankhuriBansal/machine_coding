import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning
} from 'react-icons/ai'
import './notifications.css'

const iconStyles = { marginRight: '10px' }

const icons = {
  success: <AiOutlineCheckCircle style={iconStyles} />,
  info: <AiOutlineInfoCircle style={iconStyles} />,
  warning: <AiOutlineWarning style={iconStyles} />,
  error: <AiOutlineCloseCircle style={iconStyles} />
}

const Notifications = ({ type = 'info', message, onClose = () => {} }) => {
  return (
    // to procide the class name as per the type we need to use function
    <div className={`notification ${type}`}>
      {/* icon */}
      {icons[type]}
      {/* message */}
      {message}
      {/* close button */}
      <AiOutlineCloseCircle
        color='white'
        onClick={() => onClose()}
        className='closeBtn'
      />
    </div>
  )
}

export default Notifications
