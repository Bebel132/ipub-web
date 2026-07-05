import { Navigate, Route, Routes } from "react-router";
import siteMap from "./siteMap";
import Login from "../pages/Login";
import Profile from "../pages/member/Profile";
import Calendar from "../pages/member/Calendar";
import Card from "../pages/member/Card";
import Main from "../pages/admin/Main";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={siteMap.member.login} replace />} />
            <Route path={siteMap.member.login} element={<Login />} />
            <Route path={siteMap.member.memberCard} element={<Card />} />
            <Route path={siteMap.member.profile} element={<Profile />} />
            <Route path={siteMap.member.calendar} element={<Calendar />} />

            <Route path={siteMap.admin.main} element={<Main />} />
        </Routes>
    )
}