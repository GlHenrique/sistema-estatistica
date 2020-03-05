export default class FormValidators {
    static emailValidator(value) {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value);
    }
}
