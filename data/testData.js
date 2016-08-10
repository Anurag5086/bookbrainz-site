/*
 * Copyright (C) 2016  Max Prettyjohns
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

'use strict';

const testData = {};

const Editor = require('../test/bookbrainz-data').Editor;
const EditorType = require('../test/bookbrainz-data').EditorType;
const AchievementType = require('../test/bookbrainz-data').AchievementType;
const TitleType = require('../test/bookbrainz-data').TitleType;
const Revision = require('../test/bookbrainz-data').Revision;
const CreatorRevision = require('../test/bookbrainz-data').CreatorRevision;
const Bookshelf = require('../test/bookbrainz-data.js').bookshelf;
const utils = require('../node_modules/bookbrainz-data/util.js');

testData.editorTypeAttribs = {
	id: 1,
	label: 'test_type'
};

testData.editorAttribs = {
	id: 1,
	name: 'bob',
	password: 'test',
	typeId: 1,
	revisionsApplied: 0
};

testData.revisionistIAttribs = {
	id: 1,
	name: 'Revisionist I',
	description: 'create one revision',
	badgeUrl: 'http://test.com'
};

testData.revisionistIIAttribs = {
	id: 2,
	name: 'Revisionist II',
	description: 'create 25 revisions',
	badgeUrl: 'http://test.com'
};

testData.revisionistIIIAttribs = {
	id: 3,
	name: 'Revisionist III',
	description: 'create 250 revisions',
	badgeUrl: 'http://test.com'
};

testData.revisionistAttribs = {
	id: 1,
	title: 'Revisionist',
	description: 'create 250 revisions'
};

testData.creatorCreatorIAttribs = {
	id: 1,
	name: 'Creator Creator I',
	description: 'create one creator',
	badgeUrl: 'http://test.com'
};

testData.creatorCreatorIIAttribs = {
	id: 2,
	name: 'Creator Creator II',
	description: 'create 10 creators',
	badgeUrl: 'http://test.com'
};

testData.creatorCreatorIIIAttribs = {
	id: 3,
	name: 'Creator Creator III',
	description: 'create 100 creators',
	badgeUrl: 'http://test.com'
};

testData.creatorCreatorAttribs = {
	id: 1,
	title: 'Creator Creator',
	description: 'Complete Creator Creator track'
};

testData.limitedEditionIAttribs = {
	id: 1,
	name: 'Limited Edition I',
	description: 'create one edition',
	badgeUrl: 'http://test.com'
};

testData.limitedEditionIIAttribs = {
	id: 2,
	name: 'Limited Edition II',
	description: 'create 10 editions',
	badgeUrl: 'http://test.com'
};

testData.limitedEditionIIIAttribs = {
	id: 3,
	name: 'Limited Edition III',
	description: 'create 100 edtions',
	badgeUrl: 'http://test.com'
};

testData.limitedEditionAttribs = {
	id: 1,
	title: 'Limited Edition',
	description: 'Complete limited edition track'
};


testData.publisherIAttribs = {
	id: 1,
	name: 'Publisher I',
	description: 'create one publisher',
	badgeUrl: 'http://test.com'
};

testData.publisherIIAttribs = {
	id: 2,
	name: 'Publisher II',
	description: 'create 10 publishers',
	badgeUrl: 'http://test.com'
};

testData.publisherIIIAttribs = {
	id: 3,
	name: 'Publisher III',
	description: 'create 100 publishers',
	badgeUrl: 'http://test.com'
};

testData.publisherAttribs = {
	id: 1,
	title: 'Publisher',
	description: 'Complete publisher track'
};

testData.sprinterAttribs = {
	id: 1,
	name: 'Sprinter',
	description: 'create 100 creators',
	badgeUrl: 'http://test.com'
};

testData.workerBeeIAttribs = {
	id: 1,
	name: 'Worker Bee I',
	description: 'create 1 work',
	badgeUrl: 'http://test.com'
};

testData.workerBeeIIAttribs = {
	id: 2,
	name: 'Worker Bee II',
	description: 'create 10 works',
	badgeUrl: 'http://test.com'
};

testData.workerBeeIIIAttribs = {
	id: 3,
	name: 'Worker Bee III',
	description: 'create 100 works',
	badgeUrl: 'http://test.com'
};

testData.workerBeeAttribs = {
	id: 1,
	description: 'finish worker bee track',
	title: 'Worker Bee',
};

testData.explorerIAttribs = {
	id: 1,
	name: 'Explorer I',
	description: 'view 10 entities',
	badgeUrl: 'http://test.com'
};

testData.explorerIIAttribs = {
	id: 2,
	name: 'Explorer II',
	description: 'view 100 entities',
	badgeUrl: 'http://test.com'
};

testData.explorerIIIAttribs = {
	id: 3,
	name: 'Explorer III',
	description: 'view 1000 entities',
	badgeUrl: 'http://test.com'
};

testData.explorerTitleAttribs = {
	id: 1,
	description: 'finish explorer track',
	title: 'Explorer',
};

testData.publisherCreatorIAttribs = {
	id: 1,
	name: 'Publisher Creator I',
	description: 'create 1 publisher',
	badgeUrl: 'http://test.com'
};

testData.publisherCreatorIIAttribs = {
	id: 2,
	name: 'Publisher Creator II',
	description: 'create 10 publishers',
	badgeUrl: 'http://test.com'
};

testData.publisherCreatorIIIAttribs = {
	id: 3,
	name: 'Publisher Creator III',
	description: 'create 100 publishers',
	badgeUrl: 'http://test.com'
};

testData.publisherCreatorAttribs = {
	id: 1,
	description: 'finish publisher creator track',
	title: 'Publisher Creator',
};

testData.sprinterTitleAttribs = {
	id: 1,
	title: 'Sprinter',
	description: 'Complete Creator Creator track'
};

testData.funRunnerAttribs = {
	id: 1,
	name: 'Fun Runner',
	description: 'create a revision a day for a week',
	badgeUrl: 'http://test.com'
};

testData.funRunnerTitleAttribs = {
	id: 1,
	title: 'Fun Runner',
	description: 'Complete Fun Runner track'
};

testData.marathonerAttribs = {
	id: 1,
	name: 'Marathoner',
	description: 'create a revision a day for 30 days',
	badgeUrl: 'http://test.com'
};

testData.marathonerTitleAttribs = {
	id: 1,
	title: 'Marathoner',
	description: 'Complete Marathoner track'
};

testData.timeTravellerAttribs = {
	id: 1,
	name: 'Time Traveller',
	description: 'test description',
	badgeUrl: 'http://test.com'
};

testData.timeTravellerTitleAttribs = {
	id: 1,
	title: 'Time Traveller',
	description: 'test description'
};

testData.hotOffThePressAttribs = {
	id: 1,
	name: 'Hot Off the Press',
	description: 'test description',
	badgeUrl: 'http://test.com'
};

testData.hotOffThePressTitleAttribs = {
	id: 1,
	title: 'Hot Off the Press',
	description: 'test description'
};

testData.createEditor = function() {
	return new EditorType(this.editorTypeAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new Editor(this.editorAttribs)
			.save(null, {method: 'insert'})
		);
}

testData.createRevisionist = function() {
	return new AchievementType(this.revisionistIAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new AchievementType(this.revisionistIIAttribs)
			.save(null, {method: 'insert'})
		)
		.then(() =>
			new AchievementType(this.revisionistIIIAttribs)
			.save(null, {method: 'insert'})
		)
		.then(() =>
			new TitleType(this.revisionistAttribs)
			.save(null, {method: 'insert'})
		)
}

testData.createCreatorCreator = function() {
	return new AchievementType(this.creatorCreatorIAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new AchievementType(this.creatorCreatorIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new AchievementType(this.creatorCreatorIIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new TitleType(this.creatorCreatorAttribs)
				.save(null, {method: 'insert'})
		);
}

testData.createLimitedEdition = function() {
	return new AchievementType(this.limitedEditionIAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new AchievementType(this.limitedEditionIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new AchievementType(this.limitedEditionIIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new TitleType(this.limitedEditionAttribs)
				.save(null, {method: 'insert'})
		);
}

testData.createPublisher = function() {
	return new AchievementType(this.publisherIAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new AchievementType(this.publisherIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new AchievementType(this.publisherIIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new TitleType(this.publisherAttribs)
				.save(null, {method: 'insert'})
		);
}

testData.createWorkerBee = function() {
	return new AchievementType(this.workerBeeIAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new AchievementType(this.workerBeeIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new AchievementType(this.workerBeeIIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new TitleType(this.workerBeeAttribs)
				.save(null, {method: 'insert'})
		);
}

testData.createPublisherCreator = function() {
	return new AchievementType(this.publisherCreatorIAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new AchievementType(this.publisherCreatorIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new AchievementType(this.publisherCreatorIIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new TitleType(this.publisherCreatorAttribs)
				.save(null, {method: 'insert'})
		);
}

testData.createExplorer = function() {
	return new AchievementType(this.explorerIAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new AchievementType(this.explorerIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new AchievementType(this.explorerIIIAttribs)
				.save(null, {method: 'insert'})
		)
		.then(() =>
			new TitleType(this.explorerTitleAttribs)
				.save(null, {method: 'insert'})
		);
}

testData.createSprinter = function() {
	return new AchievementType(this.sprinterAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new TitleType(this.sprinterTitleAttribs)
			.save(null, {method: 'insert'})
		);
}

testData.sprinterHelper = function(numRevisions) {
	const promiseList = [];
	for (let i = 0; i < numRevisions; i++) {
		promiseList.push(
			new Revision({authorId: testData.editorAttribs.id})
				.save(null, {method: 'insert'})
		);
	}
	return Promise.all(promiseList);
}

testData.createFunRunner = function() {
	return new AchievementType(this.funRunnerAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new TitleType(this.funRunnerTitleAttribs)
			.save(null, {method: 'insert'})
		);
}

testData.createMarathoner = function() {
	return new AchievementType(this.marathonerAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new TitleType(this.marathonerTitleAttribs)
			.save(null, {method: 'insert'})
		);
}

testData.createTimeTraveller = function() {
	return new AchievementType(this.timeTravellerAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new TitleType(this.timeTravellerTitleAttribs)
			.save(null, {method: 'insert'})
		);
}

testData.createHotOffThePress = function() {
	return new AchievementType(this.hotOffThePressAttribs)
		.save(null, {method: 'insert'})
		.then(() =>
			new TitleType(this.hotOffThePressTitleAttribs)
			.save(null, {method: 'insert'})
		);
}

testData.typeRevisionHelper = function(revisionType, rowcount) {
	return function(type, editor) {
		let rowCountPromise;
		if (type == revisionType) {
			rowCountPromise = Promise.resolve(rowcount);
		}
		else {
			rowCountPromise = Promise.resolve(0);
		}
		return rowCountPromise;
	};
}

testData.typeCreationHelper = function(revisionTypeString, rowCount) {
	return function(type, string, editor) {
		let rowCountPromise;
		if (string === revisionTypeString) {
			rowCountPromise = Promise.resolve(rowCount);
		}
		else {
			rowCountPromise = Promise.resolve(0);
		}
		return rowCountPromise;
	};
}

testData.truncate = () => utils.truncateTables(Bookshelf, [
		'bookbrainz.editor',
		'bookbrainz.editor_type',
		'bookbrainz.achievement_type',
		'bookbrainz.achievement_unlock',
		'bookbrainz.title_type',
		'bookbrainz.title_unlock',
		'bookbrainz.revision',
		'musicbrainz.gender'
	]);

module.exports = testData;
