// Validations for entries
function entryValidation({ date, mood, overallMood, selectedIcon, note}) {
    const errs = {}

    if (!date) errs.datetime = 'Date is required.'
    if (new Date(date) > new Date()) errs.datetime = 'Entry date cannot be in the future.'
    if (new Date(date) < new Date('01-01-2000')) errs.datetime = 'Entry date cannot be before the year 2000.'
    if (!mood || mood.length < 3 || mood.length > 20) errs.mood = 'Mood must be between 2-20 characters.'
    if (!overallMood) errs.overallMood = 'Please choose a number between 1-10.'
    if (!Object.values(selectedIcon).length) errs.iconId = 'Please choose an icon.'
    if (note && note.length < 10 ) errs.note = "If you choose to leave a note, it must be longer than 10 characters."
    if (note && note.length > 255) errs.note = "Note cannot be longer than 255 characters."
    return errs
}

export default entryValidation
