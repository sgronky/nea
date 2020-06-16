import React, { Component } from 'react';
import { Index } from "elasticlunr"
import { Link } from "gatsby"
import { navigate } from '@reach/router'

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
      //return <Redirect to = { this.state.redirectPath } />
      navigate(this.state.redirectPath);
    }

    const results = this.state.results.length === 0 ? ( <div /> ) : (
      <div class="bg-gray-100 absolute mt-1 px-2 w-full">
          {this.state.results.map(page => (
            <Link to={"/" + page.slug} class="bg-gray-100">
              <strong class="text-lg px-2 block mt-2">{page.title}</strong>
              <label class="text-xs px-2 bg-blue-200 rounded-full">{page.tags.join(", ")}</label>
            </Link>            
          ))}          
      </div>
    );

    return (
      <div class="w-full bg-gray-100 focus:outline-none focus:shadow-outline relative inline-block">
        <input type="text" class="w-full px-4 py-3 leading-tight text-sm text-gray-600 bg-gray-100 placeholder-gray-400"
          placeholder="search"
          onChange={this.search}
          onKeyDown={this.handleKeyDown}
          value={this.query} 
          ref="searchBox"/>
        { results }
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
        this.setState({ redirectPath : this.state.results[0].slug });
        this.setState({ redirect : true });
      }
    } else if (evt.key === "/") {
      this.refs.searchBox.focus();
      this.refs.searchBox.value = "";
      evt.preventDefault();
    } else if (evt.keyCode === 27) {
      this.refs.searchBox.blur();
    }
  }

   componentDidMount = () => {
     document.addEventListener("keydown", this.handleKeyDown);
   }

   componentWillUnmount = () => {
     document.removeEventListener("keydown", this.handleKeyDown);
   }
}


export default Search 