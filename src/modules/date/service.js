export default function formatDate(dateISO8601) {
    const date = new Date(dateISO8601);

    const monthNames = [
        "JAN", "FEB", "MAR",
        "APR", "MAY", "JUN", "JUL",
        "AUG", "SEPT", "OCT",
        "NOV", "DEC"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}