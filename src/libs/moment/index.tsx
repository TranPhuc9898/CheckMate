import moment from 'moment-timezone';
import 'moment/locale/vi';
import 'moment/locale/en-gb';
import 'moment/locale/id';
import 'moment/locale/th';

// Fix error timezone when user # GMT+07
// set GMT +07
moment.tz.setDefault('Asia/Jakarta');

export default moment;
