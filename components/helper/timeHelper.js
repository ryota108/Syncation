export const timeHandler = (time) => {
    const now = new Date()
    const test = now.getTime()
    const dateDemo = new Date (test)
    const min = dateDemo.setMinutes(dateDemo.getMinutes() + Number(time) )
    return min
  }