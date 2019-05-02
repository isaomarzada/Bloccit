const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;

describe('Post', () => {
	beforeEach(done => {
		this.topic;
		this.post;

		sequelize.sync({ force: true }).then(res => {
				Topic.create(
					{
						title: 'NFL Football Games',
						description: 'A list of all NFL games for that week',

						posts: [
							{
								title: 'Minnesota Vikings VS Green Bay Packers',
								body: 'Winner takes 6th seed in playoffs',
							},
						],
					},
					{
						include: {
							model: Post,
							as: 'posts',
						},
					},
				).then(topic => {
					this.topic = topic;
					this.post = topic.posts[0];
					done();
				});
			});
		});

	describe('#create()', () => {
		it('should create a topic object with a title and description', done => {
			Topic.create({
				title: 'NFL Football Games',
				description: 'A list of all NFL games for that week',
			})
				.then(topic => {
					expect(topic.title).toBe('NFL Football Games');
					expect(topic.description).toBe('A list of all NFL games for that week');
					done();
				})
				.catch(err => {
					console.log(err);
					done();
				});
		});

		it('should not create a topic with missing title or description', done => {
			Topic.create({
				title:'NFL Football Games',
			})
				.then(post => {
					done();
				})
				.catch(err => {
					expect(err.message).toContain('Topic.description cannot be null');
					done();
				});
		});
	});
	describe('#getPosts()', () => {
		it('should return the posts with the associated topic', done => {
			this.topic.getPosts().then(associatedPosts => {
				expect(associatedPosts[0].title).toBe( 'Minnesota Vikings VS Green Bay Packers');
				expect(associatedPosts[0].body).toBe('Winner takes 6th seed in playoffs');
				expect(associatedPosts[0].topicId).toBe(this.topic.id);
				done();
			});
		});
	});
});
