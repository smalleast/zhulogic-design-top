import LocalDate from './date';


export default class {


    static countDown(inTime) {
        let inSecond = new Date(new Date(inTime) - new Date()).getTime();
        console.log('inSecond', inSecond);
        return LocalDate.countDown(inSecond);
    }

    static payCountDown(inTime) {
        return LocalDate.payCountDown(inTime);
    }
    static nl2br(inMsg, inISXhtml) {
        const is_xhtml = inISXhtml || false;
        const breakTag = (is_xhtml) ? '<br />' : '<br>';
        const msg = (inMsg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');

        return msg;
    }

}
