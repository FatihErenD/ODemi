'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import TopBar from '../components/TopBar'
import Container from '../components/Container'
import ProfileInfo from '../components/ProfileInfo'
import SideBar from '../components/SideBar'

export default function EditProfile() {
    const [username, setUsername] = useState('')
    const [topBarVisible, setTopBarVisible] = useState(true)


    return (
        <div>
            <TopBar onVisibilityChange={setTopBarVisible} />
            <SideBar topOffset={topBarVisible} shouldOpen={false} />
            <ProfileInfo username={username} ></ProfileInfo>
            <Container />
        </div>
    )
}