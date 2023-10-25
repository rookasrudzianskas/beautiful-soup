import {NextResponse} from "next/server";
// import {ProductData} from "@/typings";


const URL = "https://www.expedia.com/Hotel-Search?rooms=1&adults=2&destination=Barcelona&startDate=2023-08-16&endDate=2023-08-18&d1=2023-08-16&d2=2023-08-18"

export async function GET(
  request: Request,
) {
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
      parse: true,
    })
  });

  const data = await response.json();

  if(data.results.length === 0) {
    return NextResponse.next(
      new Response("No results", {status: 404})
    )
  }

  const productData: any = data.results[0];

  return NextResponse.json(productData);
}
