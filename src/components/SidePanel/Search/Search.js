import "./styles.scss";
import search from "../../../global/icons/search.svg";

const Search = () => {
  return (
    <span className="search">
      <img className="icon" src={search} alt="search" />
      <input className="search-input" placeholder="Search" />
    </span>
  );
};

export default Search;
