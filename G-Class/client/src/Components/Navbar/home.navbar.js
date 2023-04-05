import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import DefaultProfile from "../../Icons/profile.png";
import UserInfo from "../../Library/UserInfo";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ArchiveIcon from "@material-ui/icons/Archive";
import ClassIcon from "@material-ui/icons/Class";

const URL = process.env.REACT_APP_BACKEND_URL;

const HomeNavbar = () => {
  const [Profile, setProfile] = useState(null);
  const [userInfo, setUserInfo] = useState("");
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    const token = new Cookies().get("token");
    UserInfo(token).then((res) => {
      if (res) {
        if (res.profile_picture) {
          setProfile(`${URL}/${res.profile_picture.filename}`);
          setUserInfo(res);
        }
      }
    });
  }, []);

  const openNav = () =>
    (document.getElementById("sidenav").style.width = "230px");

  const CloseNav = () =>
    (document.getElementById("sidenav").style.width = "0px");

  useEffect(() => {
    if (userInfo) {
      Axios.get(`${URL}/class/get/created/${userInfo._id}`).then((res) => {
        res.data.forEach((_class) => {
          setClasses((classes) => [...classes, _class]);
        });
      });
      Axios.get(`${URL}/class/get/taught/${userInfo._id}`).then((res) => {
        res.data.forEach((_class) => {
          setClasses((classes) => [...classes, _class]);
        });
      });
      Axios.get(`${URL}/class/get/studied/${userInfo._id}`).then((res) => {
        res.data.forEach((_class) => {
          setClasses((classes) => [...classes, _class]);
        });
      });
    }
  }, [userInfo]);

  return (
    <nav className="text-dark topnav">
      <div id="sidenav" className="sidenav">
        <span className="closebtn nav-ham" onClick={CloseNav}>
          &times;
        </span>
        <NavLink to="/calendar" className="sidenav-title">
          <CalendarTodayIcon /> Calendar
        </NavLink>
        <NavLink to="/" className="sidenav-title">
          <ClassIcon /> Classes
        </NavLink>
        {classes.map((_class) => {
          if (
            !_class.archived &&
            !userInfo.archived_class.includes(_class._id)
          ) {
            return (
              <NavLink
                to={`/class/${_class._id}`}
                key={_class._id}
                className="sidenav-item"
              >
                {_class.title}
              </NavLink>
            );
          } else return null;
        })}
        {<NavLink to="/archived" className="sidenav-title">
          <ArchiveIcon /> Archived Class
        </NavLink> }
      </div>
      <span className="nav-logo  nav-ham" onClick={openNav}>
        ☰
      </span>
      <p className="nav-logo nav-ham" onClick={() => (window.location = "/")}>
        Classroom
      </p>
      <div className="nav-margin">
        {Profile === null ? (
          <img
            src={DefaultProfile}
            alt="Default Profile Logo"
            className="nav-right pp nav-ham"
            onClick={() => (window.location = "/profile")}
          ></img>
        ) : (
          <img
            src={Profile}
            alt="Profile Logo"
            className="nav-right pp nav-ham"
            onClick={() => (window.location = "/profile")}
          ></img>
        )}
        <span
          className="nav-right nav-ham"
          onClick={() => (window.location = "/class/join")}
        >
          +
        </span>
        <NavLink to="/calendar" className="nav-right nav-ham">
          <CalendarTodayIcon />
        </NavLink>
      </div>
    </nav>
  );
};

export default HomeNavbar;
