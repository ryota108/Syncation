import { NextApiResponse } from 'next'
import * as line from '@line/bot-sdk';



const config = {
  channelAccessToken:"wcvZD1C+lbiD+qkPwPigbs+pVv/0mVMdcuisSQyKReRke/gL5Sq8p5Pt00PA2zqWqEzBPm8ec79Re9jUDVtNyfL7mXfFrOz9rALVcofGq2xKHi89m55DfrO0SlnAOeF+3uQclbpJvdyy+3cqVWFGEAdB04t89/1O/w1cDnyilFU=",
  channelSecret:"17400e256fc8598151552705dcc0de82"
};

const client = new line.Client(config);

export default ({ query: { word } }: { query: { word: string } }, res: NextApiResponse) => {
  console.info('res data', word)
  client.broadcast({
    type: "text",
    text: word
  }).then(data => console.log(data))
    .catch(e => console.log(e))
  res.status(200).json({ message: `you requested for ${word} ` });
};
