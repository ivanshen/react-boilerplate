export const buildRequestUrl = (req) => {
	if (req) {
		return `${window.location.protocol}//${window.location.host}/${req}`
	}
	return `${window.location.protocol}//${window.location.host}`
}

export const isValidateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}