import React from "react";
import "../styles/pokemonPage.css";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProgressBar from "./ProgressBar";
import { useRef } from "react";

const PokemonPage = () => {
  const [pokemonListDisplay, setPokemonListDisplay] = useState(true);
  const [listPokemon, setListPokemon] = useState([]);
  const [staticPokemon, setStaticPokemon] = useState([]);
  const [page, setPage] = useState(14);
  const [status, setStatus] = useState(true);
  const [name, setName] = useState("");
  const searchPokemonList = (e) => {
    const { value } = e.target;
    if (value.length == 0) {
      setPokemonListDisplay(true);
    } else {
      setPokemonListDisplay(false);

      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
        .then((res) => {
          let temp = res.data.results;
          let new_list = temp.filter((data) =>
            data.name.toLowerCase().includes(value)
          );
          setListPokemon([...new_list]);
        });
    }
  };

  const pokemonFetch = (data) => {
    console.log("data:", data.name);
    setPokemonListDisplay(true);
  };

  useEffect(() => {
    loop();
  }, [page]);

  const loop = async () => {
    let arr = [];

    for (let i = 1; i <= page; i++) {
      // console.log()
      arr.push(await loopFetch(i));
    }

    setStaticPokemon([...arr]);
  };

  async function loopFetch(id) {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const res = await data.json();
    return res;
  }

  const update = () => {
    setPage(page + 10);
  };

  const statusChange = () => {
    setStatus(!status);
    console.log(status, data, "status");
  };

  return (
    <>
      <div id="inpBox">
        <BsSearch id="searchLogo" />
        <input
          type="text"
          placeholder="Search Your Favourite Pokemon"
          className="inputBox"
          onInput={searchPokemonList}
        />
        <div
          className="outPutBox"
          style={{ display: pokemonListDisplay ? "none" : "block" }}
        >
          {listPokemon.map((data) => {
            return (
              <p
                id="pokemonName"
                onClick={() => {
                  pokemonFetch(data);
                }}
              >
                {data.name}
              </p>
            );
          })}
        </div>
      </div>

      {/* search box work  */}

      <InfiniteScroll
        dataLength={staticPokemon.length}
        next={update}
        hasMore={true}
        loader={""}
      >
        <div id="dataShowGrid">
          {staticPokemon.map((data, i) => {
            // console.log('data:', data)
            // let x = data.stats
            // console.log('x:', x)
            // console.log( "img", data.sprites.back_default)
            // console.log( "id", data.order)
            // console.log( "name", data.name)
            // console.log( "type", data.types[0].type.name)

            return (
              <>
                <div className="singleBox">
                  <div className="front" key={data.order}>
                    <img
                      src={data.sprites.back_default}
                      className="pokeLogo"
                      alt=""
                    />
                    <p className="margin fontsizep">#{data.order}</p>
                    <h5 className="margin">{data.name}</h5>
                    <p className="margin fontsizep">
                      {data.types[0].type.name}
                    </p>
                  </div>
                  <div className="back">
                    {/* <div> */}

                    {data.stats.map((gp, i) => {
                      // console.log(gp)
                      // console.log(data.order)
                      return (
                        <div key={i} className="singleBox2">
                          {/* <label></label> */}
                          <div className="fontBarName">{gp.stat.name}</div>
                          <div className="bar">
                            <ProgressBar completed={gp.base_stat} />
                          </div>
                        </div>
                      );
                    })}
                    {/* </div> */}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default PokemonPage;
