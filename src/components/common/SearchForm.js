import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchForm extends React.Component {
  state = {
    search: "",
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (this.state.search.trim() === "") {
      return;
    }
    this.props.history.push(`/results?q=${this.state.search}`);
    this.setState({
      search: "",
    });
  };

  handleInput = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    return (
      <form className="d-flex" onSubmit={this.handleSearch}>
        <input
          type="text"
          placeholder="Search video..."
          className="form-control"
          name="search"
          value={this.state.search}
          onChange={this.handleInput}
        />
        <button className="btn btn-outline-dark mx-2" type="submit">
          <FontAwesomeIcon icon="search" />
        </button>
      </form>
    );
  }
}

export default withRouter(SearchForm);
