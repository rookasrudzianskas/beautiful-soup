import {NextResponse} from "next/server";
// import {ProductData} from "@/typings";


// const URL = "https://www.expedia.com/Hotel-Search?rooms=1&adults=2&destination=Barcelona&startDate=2023-08-16&endDate=2023-08-18&d1=2023-08-16&d2=2023-08-18"
const URL = "https://www.expedia.com/Flights-Search?flight-type=on&mode=search&trip=roundtrip&leg1=from:Vilnius,%20Lithuania%20(VNO-Vilnius%20Intl.),to:Oslo,%20Norway%20(OSL-Gardermoen),departure:11/8/2023TANYT&leg2=from:Oslo,%20Norway%20(OSL-Gardermoen),to:Vilnius,%20Lithuania%20(VNO-Vilnius%20Intl.),departure:11/9/2023TANYT&options=cabinclass:economy&fromDate=11/8/2023&toDate=11/9/2023&d1=2023-11-8&d2=2023-11-9&passengers=adults:1,infantinlap:N";

export async function GET(
  request: Request,
) {
  console.log('Hello? It works from here 🔴')
  const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.OXYLABS_USERNAME + ":" + process.env.OXYLABS_PASSWORD).toString("base64")}`,
    },
    cache: 'no-store',
    body: JSON.stringify({
      source: 'universal',
      url: URL,
      render: "html",
    })
  });

  const data = await response.json();

  console.log('This is the data?', data)

  // if(data.results.length === 0) {
  //   return NextResponse.next(
  //     new Response("No results", {status: 404})
  //   )
  // }
  //
  // const productData: any = data.results[0];

  return NextResponse.json("Hello from the server");
}
