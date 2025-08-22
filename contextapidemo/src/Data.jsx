import React, { useContext } from 'react'
import AuthContext from './context/AuthContext'

const Data = () => {
    const { users, setUsers } = useContext(AuthContext)

    return (
        <div>
            {
                users.map((data) => (
                    <ul>
                        <li>{data.id}</li>
                        <li>{data.email}</li>
                        <li>{data.username}</li>
                        <li>{data.address.street}</li>


                    </ul>

                ))
            }
        </div>
    )
}

export default Data
