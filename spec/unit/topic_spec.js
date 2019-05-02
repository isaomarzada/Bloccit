const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Post = require('../../src/db/models').Post;
const User = require("../../src/db/models").User;

describe('Post', () => {
  beforeEach((done) => {
     this.topic;
     this.post;
     this.user;

     sequelize.sync({force: true}).then((res) => {

// #2
       User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe"
       })
       .then((user) => {
         this.user = user; //store the user

// #3
         Topic.create({
           title: "Expeditions to Alpha Centauri",
           description: "A compilation of reports from recent visits to the star system.",

// #4
           posts: [{
             title: "My first visit to Proxima Centauri b",
             body: "I saw some rocks.",
             userId: this.user.id
           }]
         }, {

// #5
           include: {
             model: Post,
             as: "posts"
           }
         })
         .then((topic) => {
           this.topic = topic; //store the topic
           this.post = topic.posts[0]; //store the post
           done();
         })
       })
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
