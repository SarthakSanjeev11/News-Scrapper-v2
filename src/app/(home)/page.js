"use client";
import Card from "@/components/Card";
import { setFeed } from "@/store/feature/SidebarSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchRSSFeed, shuffleArray } from "@/utils/shuffelArray";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { sidebarUrl, feed } = useAppSelector((store) => store.sidebar);

  console.log(sidebarUrl);

  useEffect(() => {
    const fetchAllFeeds = async () => {
      const allFeeds = [];
      for (const url of sidebarUrl) {
        try {
          const feedItems = await fetchRSSFeed(url);
          if (Array.isArray(feedItems)) {
            allFeeds.push(...feedItems);
          } else {
            console.error("feedItems is not an array", feedItems);
          }
        } catch (error) {
          console.error("Error fetching feed:", error);
        }
      }
      const shuffledFeeds = shuffleArray(allFeeds);
      dispatch(setFeed(shuffledFeeds)); // Make sure to set shuffled feeds
    };

    fetchAllFeeds();
  }, [sidebarUrl]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 pt-24">
      <div className="lg:w-11/12 w-full mx-auto flex flex-col items-center gap-10">
        <div className="w-full  grid lg:grid-cols-2 grid-cols-1  gap-4">
          {feed &&
            feed.length > 0 &&
            feed.map((data, index) => (
              <div key={index} >  <Card index={index} key={index} data={data} /></div>
            ))}
        </div>
      </div>
    </main>
  );
}
