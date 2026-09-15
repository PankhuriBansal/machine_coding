import {useState, useCallback} from "react"
import Notifications from "../components/notifications"

const useNotifications = (position="top-right") => {
    const [notifications,setNotifications] = useState(null)
    // persist  the value of timer, useref or usecallback -- memozie this function
    let timer;
    // function to trigger notification
    const triggerNotifications = useCallback((notificationProps) => {
        clearTimeout(timer)
        setNotifications(notificationProps)
        // to disable the toast notification after time is out as in 3s
        setTimeout(() => {
            setNotifications(null) //after duration is set
        }, notificationProps.duration)
    }, [])
    const NotificationComponent = notifications ? (
        <div className={`${position}`}>
            <Notifications
                {...notifications}
            />
        </div>
    ):  null
    return {NotificationComponent, triggerNotifications}
}

export default useNotifications;