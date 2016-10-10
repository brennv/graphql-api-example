import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';
import Mongoose from 'mongoose';
import rp from 'request-promise';
// import pg from 'pg';


// sql connection
const pg_db_user = process.env.POSTGRES_DB_USER;
const pg_db_password = process.env.POSTGRES_DB_PASS;
const pg_db_name = process.env.POSTGRES_DB_NAME;

const db = new Sequelize(pg_db_name, pg_db_user, pg_db_password, {
  host: 'postgres',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// const db = new Sequelize('db', null, null, {
//   dialect: 'sqlite',
//   storage: './db.sqlite',
// });

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);


// nosql connection
const mongo = Mongoose.connect('mongodb://mongo/views');

mongo.Promise = global.Promise;  // http://mongoosejs.com/docs/promises.html

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('views', ViewSchema);

// demo data
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      }).then((post) => {
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true });
      });
    });
  });
});

const Author = db.models.author;
const Post = db.models.post;


// rest connection
const FortuneCookie = {
  getOne() {
    return rp('http://fortunecookieapi.com/v1/cookie')
      .then((res) => JSON.parse(res))
      .then((res) => {
        return res[0].fortune.message;
      });
  },
};


export { Author, Post, View, FortuneCookie };  // Post export extraneous
