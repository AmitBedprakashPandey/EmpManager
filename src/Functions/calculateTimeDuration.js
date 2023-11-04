export default function calculateTimeDuration(startTime, endTime) {
    const startTimeParts = startTime.split(':');
    const endTimeParts = endTime.split(':');

    var startHours = parseInt(startTimeParts[0]);
    const startMinutes = parseInt(startTimeParts[1].split(' ')[0]);
    const startMeridiem = startTimeParts[1].split(' ')[1];

    var endHours = parseInt(endTimeParts[0]);
    var endMinutes = parseInt(endTimeParts[1].split(' ')[0]);
    const endMeridiem = endTimeParts[1].split(' ')[1];

    if (startMeridiem === 'PM' && startHours !== 12) {
      startHours += 12;
    }

    if (endMeridiem === 'PM' && endHours !== 12) {
      endHours += 12;
    }

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes, 0, 0);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes, 0, 0);

    const durationInMilliseconds = endDate - startDate;

    const hours = Math.floor(durationInMilliseconds / 3600000); // 1 hour = 3600000 milliseconds
    const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000); // 1 minute = 60000 milliseconds

    console.log(`${hours} hours and ${minutes} minutes`);
    return `${hours}:${minutes}`;

}