const Notification = ({ notification, type }) => {
  if (type != "success" && type != "failure") {
    console.log("Programming error! Notification is either success of failure");
    return null;
  }
  const notificationStyle = {
    color: type === "success" ? "green" : "red",
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
