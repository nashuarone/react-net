const UNFOLLOW = "UNFOLLOW";
const FOLLOW = "FOLLOW";
const SET_USERS = "SET_USERS";

let initialState = {
  users: [
    // {
    //   id: 1,
    //   followed: true,
    //   name: "Tiger",
    //   photoUrl: "https://www.peoples.ru/sport/golf/woods/RN3nOkNE8s0Rs.jpeg",
    //   status: "go na more",
    //   location: { country: "Russia", city: "Moscow" },
    // },
    // {
    //   id: 2,
    //   followed: false,
    //   name: "Mishelle",
    //   photoUrl: "https://imperiyazvezd.ru/img/thumbs/it40000006614.jpg",
    //   status: "trampampam",
    //   location: { country: "USA", city: "Boston" },
    // }
  ],
};

const userReducer = (state_u = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state_u,
        users: state_u.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true }
          }
          return u
        })
      }
    case UNFOLLOW:
      return {
        ...state_u,
        users: state_u.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        })
      }
    case SET_USERS:
      return {
        ...state_u, users: [ ...state_u.users, ...action.users ]
      }
    default:
      return state_u;
  }
}

export const followAC = (userId) => ({ type: FOLLOW, userId });

export const unfollowAC = (userId) => ({
  type: UNFOLLOW,
  userId,
});

export const setUsers = (users) => ({ type: SET_USERS, users })

export default userReducer;
