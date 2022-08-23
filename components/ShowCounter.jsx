import DateTimeDisplay from "./DateTimeDisplay";
import classes from "./ShowCounter.module.css";
const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className={classes.showCounter} >
        {/* <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p> */}
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <p className={classes.dot}>:</p>
        <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
        <p className={classes.dot}>:</p>
        <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
    </div>
  );
};
export default ShowCounter;