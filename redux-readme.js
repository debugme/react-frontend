// Principles of Redux
// -------------------
// 1. State of entire application held in a single Javascript object (aka as a state tree)
// 2. State tree is read-only i.e. you should not mutate it directly. When you want to change application state:
//    (1) dispatch an action to a reducer that describes what state to change and what value to change it to e.g.
//        const action = { type: 'update-search-terms', data: ['happy']}
//    (2) a reducer is a pure function that consumes the current application state and an action.
//        It creates a modified copy of the application state by combining the previous application state and action.
//        It never modifies the previous application state as it is a pure function e.g.

//        function reducer(state, action) {
//          if (typeof state === 'undefined') {

//            return {
//              search_terms: [],
//              pageCount: 10,
//              popularUsers: false,
//              videoChannel: window.com.debugme.videos.data,
//              pages: pages,
//              index: index
//              filtersActive: false

//            }
//          }
//          switch (action.type) {
//            case 'triggerSaerch':
//             return Object.assign({}, state, { search_terms })
//            default:
//             return state§
//          }
//        }

//   (3) Create a Redux store e.g.

//       const { createStore } = Redux
//       const store = createStore(reducer)

//   (4) Associate store updates with application

//       const triggerSearch = function(searchTerms) {
//         store.dispatch({type: 'triggerSearch', searchTerms: searchTerms})
//       }

//       const render = function() {
//         const application = (
//           <Application {...store.getState()} triggerSearch={triggerSearch}/>
//         )
//         ReactDOM.render(application)
//       }

//      store.subscribe(render)
//      render()



// function moveToNextPage(totalPages, oldIndex) {
//   // const value = this.state.index + 1
//   // const index = value % this.state.pages.length
//   // this._updateState({ index })
//   const state = { index: (oldIndex + 1) % totalPages }
//   return state
// }

// function togglePopularUsers(popularUsers) {
//   const state = { index: 0, popularUsers: !popularUsers }
//   return state
// }

// function triggerSearch(searchValue) {
//   //const searchValue = event.target.value
//   const tokenValues = searchValue.toLowerCase().trim().split(/\s*\s\s*/)
//   const uniqueValues = _.uniq(tokenValues)
//   const searchTerms = uniqueValues.filter(value => value.length)
//   const state = { index: 0, searchTerms }
//   return state
// }

// function togglePageCount(pageCount) {
//   let state = { index: 0 }
//   switch (pageCount) {
//     case 10: state.pageCount = 25; break;
//     case 25: state.pageCount = 50; break;
//     default: state.pageCount = 10; break;
//   }
//   return state
// }

// function hasSearchTerm(searchTerms, video) {
//   if (!video.description)
//     return false
//   if (!searchTerms.length)
//     return true
//   const description = video.description.toLowerCase()
//   const targetFound = searchTerms
//     .map(term => description.includes(term.toLowerCase()))
//     .filter(value => value === true)
//     .length > 0
//   return targetFound
// }

// function byPopularUser(popularUsers, video) {
//   if (!popularUsers)
//     return true
//   const popularUserLikes = 10
//   const userLikes = _.get(video, 'user.metadata.connections.likes.total', 0)
//   const isPopularVideo = userLikes >= popularUserLikes
//   return isPopularVideo
// }

// function buildPageInfo ({searchTerms, pageCount, popularUsers, videosChannel, index = 0}) {
//   const videoHasSearchTerm = hasSearchTerm.bind(this, searchTerms)
//   const videoByPopularUser = byPopularUser.bind(this, popularUsers)
//   const filteredVideos = videosChannel
//     .filter(videoHasSearchTerm)
//     .filter(videoByPopularUser)
//   const pages = filteredVideos.length > 0 ? _.chunk(filteredVideos, pageCount) : [[]]
//   const pageInfo = { pages, index }
//   return pageInfo
// }

// function filtersActive({searchTerms, pageCount, popularUsers, index}) {
//   if (searchTerms.length > 0)
//     return true
//   if (pageCount !== 10)
//     return true
//   if (popularUsers === true)
//     return true
//   if (index !== 0)
//     return true
//   return false
// }

// function getInitialState() {
//   const newState = {
//     search_terms: [],
//     pageCount: 10,
//     popularUsers: false,
//     videoChannel: window.com.debugme.videos.data
//   }
//   return { ...newState, ...buildPageInfo(newState), filtersActive: filtersActive(newState)}
// }

// function reducer(state, action) {
//   if (typeof state === 'undefined') {
//     return getInitialState()
//   }
//   switch (action.type) {
//     case 'triggerSearch':
//       const newState = { ...state, ...triggerSearch(action.data)}
//       return { ...newState, ...buildPageInfo(newState), filtersActive: filtersActive(newState)}
//     case 'togglePageCount':
//       const newState = { ...state, ...togglePageCount(action.data)}
//       return { ...newState, ...buildPageInfo(newState), filtersActive: filtersActive(newState)}
//     case 'togglePopularUsers':
//       const newState = { ...state, ...togglePopularUsers(action.data)}
//       return { ...newState, ...buildPageInfo(newState), filtersActive: filtersActive(newState)}
//     case 'moveToNextPage':
//       const newState = { ...state, ...moveToNextPage(state.pages.length, action.data)}
//       return { ...newState, ...buildPageInfo(newState), filtersActive: filtersActive(newState)}
//     default:
//       return state
//   }
// }

// const { createStore } = Redux

// const store = createStore(reducer)

// const api = {
//   triggerSearch,
//   togglePageCount,
//   togglePopularUsers,
//   moveToNextPage
// }

// function render() {
//   ReactDOM.render(
//     <Application store={store} {...api} />,
//     document.querySelector('#application')
//   )
// }

// store.subscribe(render)
// render();











































