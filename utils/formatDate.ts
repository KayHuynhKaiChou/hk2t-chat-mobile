const minuteToMilisecond = 60000;

export function formatDateBetweenMsg(
  previousMsgDate: string | null,
  currentMsgDate: string
) {
  let currentMsgDateObj = new Date(currentMsgDate);
  let dateNow = new Date(Date.now());

  let currentMsgDateStr = currentMsgDateObj.toDateString().split(" ");
  let { minute, hours } = {
    minute: currentMsgDateObj.getMinutes(),
    hours: currentMsgDateObj.getHours(),
  };
  let minutes = minute < 10 ? "0" + minute : minute;

  // Handle case consecutive messages (ex: trong 20 phút nhắn tin , 
    // chỉ message đầu là hiện time , còn lại KO hiện, nếu msg mới đc gửi ở phút thứ 21 thì hiện time)
  const isShortTimeInterval = 
    previousMsgDate &&
    currentMsgDateObj.getTime() - new Date(previousMsgDate).getTime() < minuteToMilisecond * 20

  let formatDate = {
    date: '',
    isShowDate: !isShortTimeInterval
  }
  switch (true) {
    // case previousMsgDate &&
    //   currentMsgDateObj.getTime() - new Date(previousMsgDate).getTime() <
    //     minuteToMilisecond * 20:
    //   return null;

    // Handle case different year 
    case currentMsgDateObj.getFullYear() !== dateNow.getFullYear():
      formatDate.date = `${currentMsgDateStr[1]} ${currentMsgDateStr[2]}, ${currentMsgDateStr[3]}, ${hours}:${minutes}`;
      break;

    // Handle case different month and week
    case currentMsgDateObj.getMonth() !== dateNow.getMonth():
    case dateNow.getDate() - currentMsgDateObj.getDate() > 6:
    case currentMsgDateObj.getDay() > dateNow.getDay():
      formatDate.date = `${currentMsgDateStr[1]} ${currentMsgDateStr[2]}, ${hours}:${minutes}`;
      break;

    // Handle case same day (ex: 15:30)
    case currentMsgDateObj.getDate() === dateNow.getDate():
      formatDate.date = `${hours}:${minutes}`;
      break;

    // Handle case same week 
    default:
      formatDate.date = `${currentMsgDateStr[0]}, ${hours}:${minutes}`;
      break;
  }

  return formatDate
}
