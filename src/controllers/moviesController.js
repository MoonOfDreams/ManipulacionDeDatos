const db = require("../database/models");
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
  list: (req, res) => {
    db.Movie.findAll().then((movies) => {
      res.render("moviesList.ejs", { movies });
    });
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesDetail.ejs", { movie });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("newestMovies", { movies });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: { [db.Sequelize.Op.gte]: 8 },
      },
      order: [["rating", "DESC"]],
    }).then((movies) => {
      res.render("recommendedMovies.ejs", { movies });
    });
  }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
  add: function (req, res) {
    res.render("moviesAdd");
  },
  create: async function (req, res) {
    let movie = {
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length,
    };
    await db.Movie.create(movie);
    res.redirect("/movies");
  },
  edit: async function (req, res) {
    let Movie = await db.Movie.findByPk(req.params.id);

    res.render("moviesEdit", { Movie });
  },
  update: async function (req, res) {
    let movie = {
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length,
    };
    await db.Movie.update(movie, { where: { id: req.params.id } });
    res.redirect("/movies");
  },
  delete: async function (req, res) {
    let Movie = await db.Movie.findByPk(req.params.id);

    res.render("moviesDelete", { Movie });
  },
  destroy: async function (req, res) {
    await db.Movie.destroy({ where: { id: req.params.id } });
    res.redirect("/movies");
  },
};

module.exports = moviesController;
