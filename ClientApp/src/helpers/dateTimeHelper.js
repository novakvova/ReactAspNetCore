import moment from 'moment';
import 'moment/locale/en-gb';

export const getfromNowDateDiffHelper = (dateUTC) =>{
    var date = moment(dateUTC);
    return date.fromNow();
}
