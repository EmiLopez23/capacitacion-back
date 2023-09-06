export function getTodayRange(){
    const today = (new Date())
    today.setHours(0,0,0,0)
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate()+1)
    return {startDate:today, endDate:tomorrow}
}