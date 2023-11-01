export const dateDetectedReply = 'I saw you interested in this <b>date</b>, give me location and I could tell you weather there that time, <s>but after research i discovered it is paid information and i will tell you current weather</s>'
export const randomMessageDetected = '<i> also think so</i>'
export function weatherReplyPrepare(data) {
    return `<s>I don\'t know what to say</s>, so <u>I\'ll tell you weather</u>. So:\n<i>${data.weather[0].description}</i>\nTemperature:<pre style="background-color: #f2f2f2; padding: 10px; border-radius: 5px;">${Math.round(data.main.temp - 273.15)}°C</pre>`
}