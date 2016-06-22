/*
 * Copyright (C) 2015  Ben Ockmore
 *               2015  Sean Burke
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

const React = require('react');
const request = require('superagent-bluebird-promise');

const Button = require('react-bootstrap').Button;
const Input = require('react-bootstrap').Input;
const Select = require('../input/select2.jsx');
const LoadingSpinner = require('../loading_spinner.jsx');

module.exports = React.createClass({
	displayName: 'profileForm',
	propTypes: {
		bio: React.PropTypes.string,
		id: React.PropTypes.number,
		title: React.PropTypes.string
	},
	getInitialState() {
		'use strict';
		return {
			bio: this.props.editor.bio,
			title: toString(this.props.editor.titleUnlockId),
			waiting: false
		};
	},
	handleSubmit(evt) {
		'use strict';

		evt.preventDefault();
		const data = {
			id: this.props.editor.id,
			bio: this.bio.getValue().trim(),
			title: this.title.getValue()
		};
		console.log(data);
		this.setState({waiting: true});

		request.post('/editor/edit/handler')
			.send(data).promise()
			.then((res) => {
				const editor = res.body.editor;
				window.location.href = `/editor/${this.props.editor.id}`;
			});
	},
	render() {
		'use strict';
		const loadingElement = this.state.waiting ? <LoadingSpinner/> : null;
		const titles = this.props.titles.map(function(unlock) {
			const title = unlock.title;
			title.unlockId = unlock.id;
			return title;
		});
		return (
			<form
				className="form-horizontal"
				onSubmit={this.handleSubmit}
			>
				{loadingElement}
				<Input
					defaultValue={this.state.bio}
					label="Bio"
					labelClassName="col-md-3"
					ref={(ref) => this.bio = ref}
					type="textarea"
					wrapperClassName="col-md-9"
					/>
				<Select
					noDefault
					defaultValue={this.title}
					idAttribute="unlockId"
					label="Title"
					labelAttribute="title"
					labelClassName="col-md-4"
					options={titles}
					placeholder="Select title"
					ref={(ref) => this.title = ref}
					wrapperClassName="col-md-4"
				/>
				<div className="form-group">
					<div className="col-md-4 col-md-offset-4">
						<Button
							block
							bsSize="large"
							bsStyle="primary"
							type="submit"
						>
							Update!
						</Button>
					</div>
				</div>
			</form>
		);
	}
});
