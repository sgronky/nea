import React, { Component } from 'react';
import { Index } from "elasticlunr";
import { Link } from "gatsby";
import { navigate } from '@reach/router';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ``,
      results: [],
      redirect: false,
      redirectPath: '',
    }
  }
  render() {
    if (this.state.redirect) {
      navigate(this.state.redirectPath);
    }

    const results = this.state.results.length === 0 ? (<div />) : (
      <div className="bg-white bg-opacity-90 absolute mt-1 pb-5 px-2 w-full">
        {this.state.results.map(page => (
          <Link to={"/" + page.slug}>
            <span className="text-lg px-2 block mt-2">
              {page.title}
            </span>
            {this.tokenizeTags(page.tags)}
          </Link>
        ))}
      </div>
    );

    return (
      <div className="w-full relative inline-block">
        <input type="text" className="w-full px-10 py-3 leading-tight text-sm text-black bg-graylight bg-opacity-25 placeholder-gray focus:outline-none focus:shadow-focus-red rounded-sm"
          placeholder="Search document (type &#34;/&#34; to acquire focus"
          onChange={this.search}
          onKeyDown={this.handleKeyDown}
          value={this.query}
          ref="searchBox" />
        {results}
      </div>
    );
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      results: this.index
        .search(query, { expand: true })
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }

  handleKeyDown = evt => {
    if (evt.key === 'Enter') {
      if (this.state.results.length > 0) {
        this.setState({ redirectPath: this.state.results[0].slug });
        this.setState({ redirect: true });
      }
    } else if (evt.key === "/") {
      this.refs.searchBox.focus();
      this.refs.searchBox.value = "";
      evt.preventDefault();
    } else if (evt.keyCode === 27) {
      this.refs.searchBox.value = "";
      this.refs.searchBox.blur();
      this.setState({ query: ``, results: [] });
    }
  }

  tokenizeTags = tags => {
    const tagsElements =
      tags.map(tag =>
        (
          <label className="text-xs px-2 mx-1 bg-yellow bg-opacity-50 rounded-full uppercase font-semibold tracking-wide">{tag}</label>
        )
      );
    return tagsElements;
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
}


export default Search 