import moment from "moment";

export const formatDateTime = (date, format = "HH:mm | DD/MM/YYYY") => {
	return moment(date).format(format)
}

export const formatDateFormTimestamp = (value, format = "HH:mm | DD/MM/YYYY") => {
	let datetime = new Date(value * 1000)
	return moment(datetime).format(format)
}