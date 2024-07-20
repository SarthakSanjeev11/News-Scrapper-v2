import { createSlice } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  sidebarUrl: [
    "https://www.thehindu.com/news/national/feeder/default.rss",
  ], // Initial value for sidebarUrl
  sideBarName: "trending",
  sideBarTagColor: "bg-red-600",
  sideLang: "",
  whichLanguage : "urlEng",
  feed: [],
  model: false,
  loggedInUser: null,
  logIn: false,
  logOutModel: false
};

export const sidebarSlice = createSlice({
  name: "sidebar",

  initialState,
  reducers: {
    setSidebarUrl: (state, action) => {
      const { url, title } = action.payload;
      state.sidebarUrl = [];
      state.sidebarUrl.push(url);
      state.sideBarName = title;
    },
    setNavbar: (state, action) => {
        const {colorName,languageTitle,url,whichLanguage} = action.payload 
        state.sideLang = languageTitle;
        state.sideBarTagColor = colorName;
        state.sidebarUrl = [];
        state.sidebarUrl.push(url);
        state.whichLanguage = whichLanguage,
        state.sideBarName = "trending"

    },
    setFeed: (state, action) => {
      state.feed = action.payload
    },
    setModel: (state, action) => {
      state.model = action.payload
      // console.log("here",action)
    },
    setLoggedInUser: (state, action) =>{
      state.loggedInUser = action.payload
    },
    setLogIn: (state, action) =>{
      state.logIn = action.payload
    },
    setLogOutModel: (state, action) => {
      state.logOutModel = action.payload;
    },
  },
});

export const { setSidebarUrl, setNavbar, setFeed, setModel, setLoggedInUser, setLogIn, setLogOutModel } = sidebarSlice.actions;

// Selector to get sidebarUrl from the state

// Reducer function from the slice
export default sidebarSlice.reducer;
