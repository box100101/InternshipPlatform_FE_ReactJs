import { IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/";
import "./styles.scss";
import SelectAreaHome from "../SelectAreaHome";
import useQuery from "../../hooks/useQuery";

function SearchResultHome({ onSubmit, onClick }) {
  const [searchValue, setSearchValue] = useState("");
  const query = useQuery();
  useEffect(() => {
    const { q = "" } = query;
    setSearchValue(q);
  }, [query]);

  const onChangeSearch = (event) => {
    event.preventDefault();

    const val = event.target.value;
    setSearchValue(val);
    onSubmit && onSubmit(val);
    // setSearchValue("");
  };

  const search = (event) => {
    event.preventDefault();
    const val = event.target.value;
    setSearchValue(val);
    onSubmit && onSubmit(val);
    // setSearchValue("");
    // const val = event.target.value;
    // dispatch(getJobByName("flutter"));
    // onSubmit && onSubmit(val);
    // onSubmit && onSubmit(searchValue);
    // onClick && onClick(searchValue);
  };
  console.log(searchValue);
  return (
    <div className="header__with-search onMobile onTablet " onSubmit={search}>
      <div className="header__with-search-search ">
        <div className="header__with-search-search-wrap">
          <IconButton className="search__icon">
            <SearchOutlinedIcon />
          </IconButton>
          <input
            type="text"
            className="header__with-search-search-1"
            required
            id="none"
            placeholder="Tìm Kiếm"
            value={searchValue}
            onChange={onChangeSearch}
            onSubmit={search}
          />
        </div>
        <div className="header__with-search-search-select header__with-search-search-select-onMobile">
          <AddLocationIcon />
          {/* <CustomSelect></CustomSelect> */}
          <SelectAreaHome />
          {/* <IconButton className="select__icon-arrow-drop">
            <ArrowDropDownIcon />
          </IconButton> */}
        </div>
        <div className="header__with-search-button-search">
          <Button name="Tìm kiếm"></Button>
        </div>
      </div>
    </div>
  );
}

SearchResultHome.propTypes = {};

export default SearchResultHome;
