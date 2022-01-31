import cn from "classnames";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { dismissNotification, selectNotifications } from "../../redux/reducers/notifications";
import NotificationIcons from "../icons/NotificationIcons";
import styles from "./index.module.scss";
import { ToastProps } from "./types";

export default function Notifications() {
  const notificationsState = useAppSelector(selectNotifications);
  const dispatch = useAppDispatch();


  const handleClick = (timestamp: number) =>
    dispatch(dismissNotification(timestamp));


  return <TransitionGroup
    className={styles.container}
    enter>
    {notificationsState.notifications.map((notification,index) =>(
      <CSSTransition
        key={`notiifcation-${notification.timestamp}`}
        timeout={500}
        classNames={{
          appear: styles.slideIn,
          appearActive: styles.slideInActive,
          enter: styles.slideIn,
          enterActive: styles.slideInActive,
          exit: styles.slideOut,
          exitActive: styles.slideOutActive,
        }}
      >
        <Toast
          message={notification.message}
          type={notification.type}
          onClick={()=>handleClick(notification.timestamp)}
        />
      </CSSTransition>
    ))}
  </TransitionGroup>;
}


function Toast({ message, type = "normal", onClick }:ToastProps){
  return (
    <p
      className={cn({
        [styles.toast]:true,
        [styles.normal]:type==="normal",
        [styles.success]:type==="success",
        [styles.failure]:type==="failure"
      })}
      onClick={onClick}>
      {
        type === "normal"?
          <NotificationIcons.Normal/>
          :type === "failure"?
            <NotificationIcons.Failure/>
            :type === "success"?
              <NotificationIcons.Success/>
              :null
      }
      <span>{message}</span>
    </p>
  );
}
