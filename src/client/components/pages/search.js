/*
 * Copyright (C) 2015  Ohm Patel
 *               2016  Sean Burke
 *               2018  Nicolas Pelleiter
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */


import PagerElement from './parts/pager';
import PropTypes from 'prop-types';
import React from 'react';
import SearchField from './parts/search-field';
import SearchResults from './parts/search-results';


class SearchPage extends React.Component {
	/**
	 * Initializes component state to default values and binds class
	 * methods to proper context so that they can be directly invoked
	 * without explicit binding.
	 *
	 * @param {object} props - Properties object passed down from parents.
	 */
	constructor(props) {
		super(props);

		this.state = {
			from: 0,
			query: this.props.query,
			results: this.props.initialResults,
			size: this.props.resultsPerPage
		};

		// React does not autobind non-React class methods
		this.handleSearch = this.handleSearch.bind(this);
		this.searchResultsCallback = this.searchResultsCallback.bind(this);
		this.paginationUrl = './search/search?q=';
	}

	/**
	 * Gets user text query from the SearchField component and retrieves
	 * autocomplete search results.
	 *
	 * @param {string} query - Query string entered by user.
	 * @param {string} collection - Entity type selected from dropdown
	 * @param {boolean} reset - Reset the search 'from' to 0 for a new search
	 */
	handleSearch(query, collection) {
		if (query === this.state.query && collection === this.state.collection) {
			return;
		}
		if (typeof query !== 'string' || typeof collection !== 'string') {
			return;
		}
		const collectionString = collection ? `&collection=${collection}` : '';
		const fullQuery = `${query}${collectionString}`;

		this.pagerElement.setState({from: 0, query: fullQuery});
		this.setState({collection, from: 0, query}, this.pagerElement.triggerSearch);
	}

	searchResultsCallback(newResults) {
		this.setState({results: newResults});
	}

	/**
	 * Renders the component: Search bar with results table located vertically
	 * below it.
	 *
	 * @returns {object} - JSX to render.
	 */
	render() {
		return (
			<div id="searchPage">
				<SearchField
					entityTypes={this.props.entityTypes}
					query={this.props.query}
					onSearch={this.handleSearch}
				/>
				<SearchResults results={this.state.results}/>
				<PagerElement
					from={this.state.from}
					paginationUrl={this.paginationUrl}
					query={this.state.query}
					ref={ref => this.pagerElement = ref}
					results={this.state.results}
					searchResultsCallback={this.searchResultsCallback}
					size={this.state.size}
				/>
			</div>
		);
	}
}

SearchPage.displayName = 'SearchPage';
SearchPage.propTypes = {
	entityTypes: PropTypes.array.isRequired,
	initialResults: PropTypes.array,
	query: PropTypes.string,
	resultsPerPage: PropTypes.number
};
SearchPage.defaultProps = {
	initialResults: [],
	query: '',
	resultsPerPage: 20
};

export default SearchPage;
