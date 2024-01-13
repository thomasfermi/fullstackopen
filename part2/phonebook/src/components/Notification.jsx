const Notification = ({ notification }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (notification != null) {
    return <div style={notificationStyle}>{notification}</div>;
  }
  return null;
};

export default Notification;
