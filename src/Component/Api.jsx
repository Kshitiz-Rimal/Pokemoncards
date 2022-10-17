import { useEffect, useState } from "react";
import group from "./Gruoup.png";
import logo from "./Logo.gif";
import "./Api.css";
import React from "react";

export default function Api() {
  const [userData, setUserData] = useState();
  // sconst [searchValue, setSearchValue] = useState();

  const fetchUsers = async () => {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards`);
    setUserData(await response.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // console.log(userData);

  const userList = (user) => {
    return (
      <div
        className="card m-3"
        style={{
          width: "20rem",
          height: "25rem",
        }}
        key={user?.id}
      >
        <div className=" py-5">
          <img
            src={user.images.small}
            className="card-img-top"
            style={{
              height: "170px",
            }}
          />
        </div>

        <div className="card-body">
          <h5 className="card-title position-absolute top-0 start-0 p-2">
            {user.name}
          </h5>
          <h5 className="card-title position-absolute top-0 end-0 p-2">
            HP:{user.hp}
          </h5>
          <p className="card-text ">
            {user?.abilities?.map((ability) => (
              <div> Abilities:{ability?.name}</div>
            ))}
          </p>
          <p
            className="card-text"
            style={{ display: "flex", gap: "3px", alignItems: "center" }}
          >
            Attacks:
            {user?.attacks?.map((attack) => (
              <span
                className=""
                style={{
                  backgroundColor: "red",
                  padding: "5px",
                  borderRadius: "10px",
                  width: "auto",
                }}
              >
                {attack?.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  };

  const handleOnChange = (e) => {
    let target = e.target;
    const keywords = target.value;
    const filtered = userData.data?.filter((data) =>
      data.name.includes(keywords)
    );
    setUserData({ data: filtered });
    console.log(filtered);
  };

  return (
    <div className="container">
      <nav className="navbar sticky-top py-0;">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="LOGO" width="80" height="70" />
          </a>
        </div>
      </nav>

      <section className="hero-image">
        <img src={group} alt="hero" />;
      </section>
      <section className=" sticky-top py-4 ">
        <div className="search-bar">
          <form className="d-flex justify-content-center" role="search">
            <input
              className="form-control me-2 w-50 rounded-4 justify-content-center"
              type="search"
              placeholder="Search"
              aria-label="Search"
              name="search"
              onChange={handleOnChange}
            />
            <button className="btn btn-outline-success rounded-4" type="submit">
              Search
            </button>
          </form>
        </div>
      </section>
      <div className="row  justify-content-center d-flex">
        {userData?.data?.map(userList)}
      </div>
    </div>
  );
}
