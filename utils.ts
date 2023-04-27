import liff from '@line/liff'

export const sendMessage = async (message: string) => {
  try {
    await liff.sendMessages([
      {
        type: 'text',
        text: message,
      },
    ])
    liff.closeWindow()
  } catch (e) {
    console.log(e)
  }
}
