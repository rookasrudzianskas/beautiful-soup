"use client";

import Image from 'next/image'
import {getFetchUrl} from "@/lib/getFetchUrl";
import {useState} from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(getFetchUrl(`api/shopping/product/34234234234322`));
      console.log('Fetch url is', getFetchUrl(`api/shopping/product/34234234234322`));
      const data = await response.json();
      console.log(data);
      setLoading(false);
    } catch (e) {
      console.log(`This is error 🚀`, e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-3">
      <div>
        This is the data received from the API
      </div>
      <button disabled={loading} onClick={fetchData} className={`bg-red-500 px-4 py-2 rounded-md ${loading && 'bg-opacity-30 bg-blue-300 cursor-not-allowed'}`}>
        This is a button to scrape
      </button>
    </div>
  )
}
