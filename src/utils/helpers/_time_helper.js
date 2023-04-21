import moment from "moment";

export const formatDateTime = (date) => {
	return moment(date).format('HH:mm | DD/MM/YYYY')
}