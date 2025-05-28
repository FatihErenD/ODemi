'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import TopBar from '../components/TopBar'
import Container from '../components/Container'
import ProfileInfo from '../components/ProfileInfo'
import SideBar from '../components/SideBar'

export default function EditProfile() {

    const [username, setUsername] = useState('')
        const [topBarVisible, setTopBarVisible] = useState(true)

        useEffect(() => {
            const stored = localStorage.getItem('username')
            if (stored) setUsername(stored)
        }, [])
    return (
        <div>
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />
            <ProfileInfo username={username} />
            <Container username={username} setUsername={setUsername} />
        </div>
    )
}


