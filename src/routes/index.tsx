import { Navigate, Route, Routes } from "react-router";
import siteMap from "./siteMap";
import Login from "../pages/member/Login";
import Profile from "../pages/member/Profile";
import Calendar from "../pages/member/Calendar";
import Card from "../pages/member/Card";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={siteMap.member.login} replace />} />
            <Route path={siteMap.member.login} element={<Login />} />
            <Route path={siteMap.member.memberCard} element={<Card />} />
            <Route path={siteMap.member.profile} element={<Profile />} />
            <Route path={siteMap.member.calendar} element={<Calendar />} />

            <Route path={siteMap.admin.login} element={<div>Admin Login</div>} />
            <Route path={siteMap.admin.dashboard} element={<div>Admin Dashboard</div>} />
            <Route path={siteMap.admin.members} element={<div>Admin Members</div>} />
            <Route path={siteMap.admin.membersCards} element={<div>Admin Member Cards</div>} />
            <Route path={siteMap.admin.calendar} element={<div>Admin Calendar</div>} />
        </Routes>
    )
}