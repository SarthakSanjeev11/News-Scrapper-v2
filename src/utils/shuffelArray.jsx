import xml2js from "xml2js";
export const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  export const fetchRSSFeed = async (url) => {
    try {
      const response = await fetch(`/api/fetch-rss?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch RSS feed');
      }
      const items = await response.json();
      return items;
    } catch (err) {
      console.error("Error fetching RSS feed", err);
      return [];
    }
  };

  export const getImageUrl = (data) => {
    if (data?.enclosure && data?.enclosure[0]?.$.url) {
      return data.enclosure[0].$.url;
    } else if (data["media:thumbnail"] && data["media:thumbnail"][0]?.$.url) {
      return data["media:thumbnail"][0].$.url;
    } else if (data["media:content"] && data["media:content"][0]?.$.url) {
      return data["media:content"][0].$.url;
    } else {
      return "https://gratisography.com/wp-content/uploads/2024/03/gratisography-vr-glasses-1170x780.jpg";
    }
  };
  
