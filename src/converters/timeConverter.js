const getToday = () => {
    const d = new Date()
    let n = d.getMonth() + 1
    if(n < 10){ n = "0" + n }
    const a = d.getFullYear()
    let e = d.getDate()
    if(e < 10){ e = "0" + e }
    return a + "-" + n + "-" + e
  }

const getTimefromDate = (today) => {
    let h = today.getHours();
    if(h < 10) {h = "0" + h}
    let m = today.getMinutes();
    if(m < 10) {m = "0" + m}
    let s = today.getSeconds();
    if(s < 10) {s = "0" + s}
    return h + ":" + m + ":" + s
  }
 
  const getDayFromDate = (today) => {
    let n = today.getMonth() + 1
    if(n < 10){ n = "0" + n }
    const a = today.getFullYear()
    let e = today.getDate()
    if(e < 10){ e = "0" + e }
    return a + "-" + n + "-" + e
  }

const getTimefromDateWithoutSec = (today) => {
    let h = today.getHours();
    if(h < 10) {h = "0" + h}
    let m = today.getMinutes();
    if(m < 10) {m = "0" + m}
    return h + ":" + m
  }

const convertTimeFromSec = (time) => {
    var sec_num = parseInt(time, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    
    if(hours >= 24) {hours = hours - 24}
    if (hours   < 10) {hours   = "0" + hours}
    if (minutes < 10) {minutes = "0" + minutes}
    if (seconds < 10) {seconds = "0" + seconds}
    return hours + ':' + minutes;
}

  export {getToday, getTimefromDate, getTimefromDateWithoutSec, convertTimeFromSec, getDayFromDate}