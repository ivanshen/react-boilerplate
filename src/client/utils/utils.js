export const buildRequestUrl = (req) => {
	if (req) {
		return `${window.location.protocol}//${window.location.host}/${req}`
	}
	return `${window.location.protocol}//${window.location.host}`
}

export const isLoggedIn = function() {
	return fetch(buildRequestUrl('validate'), { 
		method: "GET", 
		headers: { "Content-Type": "application/json" },
		credentials: "include"
	}).then(res => {
		return res.json();
	}).then(res => {
		return res;
	}).catch(err => {
		return err
	})
}