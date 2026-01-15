import { useAppContext } from "@/context/AppContext"
import { RemoteUser, USER_CONNECTION_STATUS } from "@/types/user"
import Avatar from "react-avatar"

function Users() {
    const { users } = useAppContext()

    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto px-4 py-4">
            <div className="flex h-full w-full flex-wrap items-start justify-center gap-x-4 gap-y-6 md:justify-start">
                {users.map((user) => {
                    return <User key={user.socketId} user={user} />
                })}
            </div>
        </div>
    )
}

const User = ({ user }: { user: RemoteUser }) => {
    const { username, status } = user
    const title = `${username} - ${status === USER_CONNECTION_STATUS.ONLINE ? "online" : "offline"}`

    return (
        <div
            className="relative flex h-fit flex-col items-center gap-2 rounded-lg p-2 hover:bg-darkHover transition-colors"
            title={title}
        >
            <Avatar name={username} size="50" round={"12px"} title={title} />
            <p className="line-clamp-2 max-w-[80px] text-center text-xs font-medium">
                {username}
            </p>
            <div
                className={`absolute right-2 top-2 h-3 w-3 rounded-full border border-dark ${
                    status === USER_CONNECTION_STATUS.ONLINE
                        ? "bg-green-500"
                        : "bg-danger"
                }`}
            ></div>
        </div>
    )
}

export default Users
