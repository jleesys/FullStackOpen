const Message = ({ text }) => {
  if (text === null || text === '') {
    return (
      <div>
      </div>
    );
  }
  var styleError = {
    color: 'red',
    fontWeight: 700,
    borderWidth: 5,
    padding: 15,
    marginBottom: '7px',
    borderStyle: 'solid',
    borderColor: 'red'
  };
  var styleNotification = {
    // color: 'green',
    // fontWeight: 700
    ...styleError, color: 'green',
    borderColor: 'green'
  };

  if (text.toLowerCase().includes('success')) {
    return (
      <div style={styleNotification}>
        {text}
      </div>
    );
  }
  return (
    <div style={styleError}>
      {text}
    </div>
  );
};

export default Message;