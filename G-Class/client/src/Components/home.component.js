import React, { useEffect, useState } from "react";
import UserInfo from "../Library/UserInfo";
import Cookies from "universal-cookie";
import HomeNavbar from "./Navbar/home.navbar";
import Axios from "axios";
import "../App.css";
import meet from "../Icons/rop.png";
const URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const [userInfo, setUserInfo] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const token = new Cookies().get("token");
    UserInfo(token).then((res) => {
      if (res) setUserInfo(res);
      else window.location = "/login";
    });
  }, []);

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

  const Archive = (classId, owner) => {
    if (userInfo._id !== owner) {
      Axios.post(`${URL}/class/user/archive`, {
        _class: classId,
        student: userInfo._id,
        token: userInfo.token,
      })
        .then(() => (window.location = '/archived'))
        .catch(err => console.log(err.response));
    } else {
      if (window.confirm('Are you sure?')) {
        Axios.post(`${URL}/class/archive`, {
          token: userInfo.token,
          owner: userInfo._id,
          _class: classId,
        }).then(() => (window.location = '/archived'));
      }
    }
  };

  const Unenroll = (classId) => {
    Axios.post(`${URL}/class/students/delete`, {
      token: userInfo.token,
      _class: classId,
      student: userInfo._id,
    }).then(() => (window.location = "/"));
  };

  return (
    <div className="container-fluid">
      <HomeNavbar />
      <div className="container">
        {classes.map((_class) => {
          if (
            !_class.archived &&
            !userInfo.archived_class.includes(_class._id)
          ) {
            return (
              <div className="class box box-shadow" key={_class._id}>
                <div onClick={() => (window.location = `/class/${_class._id}`)}>
                  <h1 className="box-title class-box">
                    <a href={`${_class.conference}`} className="meet-a">
                      <img src={meet} alt="meet" className="meet" />
                    </a>
                    {_class.title}

                    {/* <div class="dropdown">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                        data-toggle="dropdown"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                      <ul class="dropdown-menu">
                        <p
                          className="box-option link"
                          onClick={() => Archive(_class._id, _class.owner)}
                        >
                          Archive
                        </p>
                        {_class.students.includes(userInfo._id) ? (
                          <p
                            className="box-option link"
                            onClick={() => Unenroll(_class._id)}
                          >
                            Unenroll
                          </p>
                        ) : (
                          <p
                            className="box-option link"
                            onClick={() =>
                              (window.location = `/class/${_class._id}/setting`)
                            }
                          >
                            Setting
                          </p>
                        )}
                      </ul>
                    </div>
                   */}
                  </h1>
                  <p className="box-text class-description">
                    {_class.description}
                  </p>
                </div>
                <p
                  className="box-option link"
                  onClick={() => Archive(_class._id, _class.owner)}
                >
                  <x className="boxname"> Archive</x>
                </p>
                {_class.students.includes(userInfo._id) ? (
                  <p
                    className="box-option link"
                    onClick={() => Unenroll(_class._id)}
                  >
                    <x className="boxname"> Unenroll </x>
                  </p>
                ) : (
                  <p
                    className="box-option link"
                    onClick={() =>
                      (window.location = `/class/${_class._id}/setting`)
                    }
                  >
                    <x className="boxname"> Setting </x>
                  </p>
                )}
              </div>
            );
          } else return null;
        })}
      </div>
    </div>
  );
};

export default Home;
