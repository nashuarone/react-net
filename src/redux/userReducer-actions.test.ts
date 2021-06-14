import userReducer, { InitialStateType, actions } from "./usersReducer"

let state: InitialStateType

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Zero",
        status: "status0",
        followed: false,
        photos: { large: null, small: null },
      },
      {
        id: 1,
        name: "One",
        status: "status1",
        followed: false,
        photos: { large: null, small: null },
      },
      {
        id: 2,
        name: "Two",
        status: "status2",
        followed: true,
        photos: { large: null, small: null },
      },
      {
        id: 3,
        name: "Three",
        status: "status3",
        followed: true,
        photos: { large: null, small: null },
      },
    ],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowFetching: [], //array of users ids
  }
})

test("follow success", () => {
  const newState = userReducer(state, actions.followSucces(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})
test("unfollow success", () => {
  const newState = userReducer(state, actions.unfollowSucces(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()
})
