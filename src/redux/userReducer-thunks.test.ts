import { CommonResponceType, ResultCodeEnum } from "../api/api"
import { usersAPI } from "../api/users-api"
import { actions, follow, unfollow } from "./usersReducer"

jest.mock('../api/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()
beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  usersAPIMock.follow.mockClear()
  usersAPIMock.unfollow.mockClear()
})

const result: CommonResponceType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {}
}

usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test("follow success thunk", async () => {
  const thunk = follow(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingButtons(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSucces(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingButtons(false, 1))
})
test("unfollow success thunk", async () => {
  const thunk = unfollow(1)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingButtons(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSucces(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingButtons(false, 1))
})