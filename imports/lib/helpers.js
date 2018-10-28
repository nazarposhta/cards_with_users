const updateForm = function(e) {
    let new_state = {};
    new_state[e.target.name] = e.target.value;
    this.setState(new_state);
}
const resetFieldsError = function () {
    this.setState({ error: false });
}
export { updateForm, resetFieldsError };