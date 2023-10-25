import Image from 'next/image'
import {getFetchUrl} from "@/lib/getFetchUrl";

export default async function Home() {
  const response = await fetch(getFetchUrl(`api/search`), {
    method: 'POST',
    body: JSON.stringify({}),
  });

  const data = await response.json();
  console.log(data);

  return (
    <div>
      This is the data received from the API
      <button className="bg-red-500 px-4 py-2 rounded-md">
        This is a button to scrape
      </button>
    </div>
  )
}
