
export function validate(value) {
    let valid = false;

    if (value && value.length > 0)
        valid = true;

    return valid;
}
