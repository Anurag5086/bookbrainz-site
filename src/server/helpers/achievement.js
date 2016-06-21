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

const AchievementType = require('bookbrainz-data').AchievementType;
const AchievementUnlock = require('bookbrainz-data').AchievementUnlock;
const Editor = require('bookbrainz-data').Editor;
const TitleType = require('bookbrainz-data').TitleType;
const TitleUnlock = require('bookbrainz-data').TitleUnlock;

const Promise = require('bluebird');
const achievement = {};
const Bookshelf = require('bookbrainz-data').bookshelf;

const _ = require('lodash');

function awardAchievement(editorId, achievementId) {
	const achievementAttribs = {
		editorId,
		achievementId
	};
	return new AchievementUnlock(achievementAttribs)
	.fetch()
	.then((unlock) => {
		let awardPromise;
		if (unlock === null) {
			awardPromise = new AchievementUnlock(achievementAttribs)
				.save(null, {method: 'insert'});
		}
		else {
			awardPromise = Promise.resolve(unlock);
		}
		return awardPromise;
	});
}

achievement.awardAchievement = awardAchievement;

function awardTitle(editorId, titleId) {
	const titleAttribs = {
		editorId,
		titleId
	};
	return new TitleUnlock(titleAttribs)
		.fetch()
		.then((unlock) => {
			let awardPromise;
			if (unlock === null) {
				awardPromise = new TitleUnlock(titleAttribs)
					.save(null, {method: 'insert'});
			}
			else {
				awardPromise = Promise.resolve(unlock);
			}
			return awardPromise;
		});
}

achievement.awardTitle = awardTitle;

// tiers = [{threshold, name, (titleName)}] (optional)
function testTiers(signal, editorId, tiers) {
	const promiseList = [];
	let achievementPromise;
	let achievementAwarded = false;
	for (let i = 0; i < tiers.length; i++) {
		if (signal >= tiers[i].threshold) {
			achievementAwarded = true;
			if (tiers[i].titleName) {
				promiseList.push(
					new TitleType({title: tiers[i].titleName})
						.fetch({require: true})
						.then((title) =>
							awardTitle(editorId, title.id))
				);
			}
			promiseList.push(
				new AchievementType({name: tiers[i].name})
					.fetch({require: true})
					.then((achievementTier) =>
						awardAchievement(editorId, achievementTier.id))
			);
		}
	}
	if (achievementAwarded) {
		achievementPromise = Promise.all(promiseList);
	}
	else {
		achievementPromise = Promise.resolve();
	}
	return achievementPromise;
}

function getTypeRevisions(type, editor) {
	const snakeType = _.snakeCase(type);
	const rawsql = `SELECT revisions.id, bookbrainz.${snakeType}.id \
				FROM \
				(SELECT * FROM bookbrainz.revision \
				WHERE author_id=${editor}) AS revisions \
				INNER JOIN \
				bookbrainz.${snakeType} on \
				revisions.id = bookbrainz.${snakeType}.id`;
	return Bookshelf.knex.raw(rawsql)
		.then((out) => out.rowCount);
}

function processRevisionist(editorId) {
	return new Editor({id: editorId})
		.fetch()
		.then((editor) => {
			const revisions = editor.attributes.revisionsApplied;
			const tiers = [
				{threshold: 250, name: 'Revisionist III',
					titleName: 'Revisionist'},
				{threshold: 50, name: 'Revisionist II'},
				{threshold: 1, name: 'Revisionist I'}
			];
			return testTiers(revisions, editorId, tiers);
		});
}

function processCreatorCreator(editorId) {
	getTypeRevisions('creatorRevision', editorId)
		.then((rowCount) => {
			const tiers = [
				{threshold: 100, name: 'Creator Creator III',
					titleName: 'Creator Creator'},
				{threshold: 10, name: 'Creator Creator II'},
				{threshold: 1, name: 'Creator Creator I'}
			];
			return testTiers(rowCount, editorId, tiers);
		});
}

function processLimitedEdition(editorId) {
	getTypeRevisions('editionRevision', editorId)
		.then((rowCount) => {
			const tiers = [
				{threshold: 100, name: 'Limited Edition III',
					titleName: 'Limited Edition'},
				{threshold: 10, name: 'Limited Edition II'},
				{threshold: 1, name: 'Limited Edition I'}
			];
			return testTiers(rowCount, editorId, tiers);
		});
}

function processPublisher(editorId) {
	getTypeRevisions('publisherRevision', editorId)
		.then((rowCount) => {
			const tiers = [
				{threshold: 100, name: 'Publisher III',
					titleName: 'Publisher'},
				{threshold: 10, name: 'Publisher II'},
				{threshold: 1, name: 'Publisher I'}
			];
			return testTiers(rowCount, editorId, tiers);
		});
}

function processSprinter(editorId) {
	const rawSql =
		`SELECT * from bookbrainz.revision WHERE author_id=${editorId} \
		and created_at > (SELECT CURRENT_DATE - INTERVAL \'1 hour\');`;

	return Bookshelf.knex.raw(rawSql)
		.then((out) => {
			const tiers = [
				{threshold: 10, name: 'Sprinter', titleName: 'Sprinter'}
			];
			return testTiers(out.rowCount, editorId, tiers);
		});
}


function processFunRunner(editorId) {
	const rawSql =
		`SELECT DISTINCT created_at::date from bookbrainz.revision \
		WHERE author_id=${editorId} \
		and created_at > (SELECT CURRENT_DATE - INTERVAL \'6 days\');`;

	return Bookshelf.knex.raw(rawSql)
		.then((out) => {
			console.log(out);
			const tiers = [
				{threshold: 7, name: 'Fun Runner', titleName: 'Fun Runner'}
			];
			return testTiers(out.rowCount, editorId, tiers);
		});
}

function processMarathoner(editorId) {
	const rawSql =
		`SELECT DISTINCT created_at::date from bookbrainz.revision \
		WHERE author_id=${editorId} \
		and created_at > (SELECT CURRENT_DATE - INTERVAL \'29 days\');`;
	
	return Bookshelf.knex.raw(rawSql)
		.then((out) => {
			const tiers = [
				{threshold: 30, name: 'Marathoner', titleName: 'Marathoner'}
			];
			return testTiers(out.rowCount, editorId, tiers);
		});
}


achievement.processPageVisit = () => {

};

achievement.processEdit = (userid) =>
	Promise.join(
		processRevisionist(userid),
		processCreatorCreator(userid),
		processLimitedEdition(userid),
		processPublisher(userid),
		processSprinter(userid),
		processFunRunner(userid),
		processMarathoner(userid)
	);


achievement.processComment = () => {

};

module.exports = achievement;
