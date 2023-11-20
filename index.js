const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!")
    }).catch((error) => {
        console.log("Error")
    });

app.use(express.static('public'));      


app.use("/", categoriesController);
app.use("/", articlesController);   

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4 
    }).then(articles => {
        res.render("index", {articles: articles});
    });
});

app.get("/:slug", (req, res) => {
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            res.render("article",   {article: article});
        }else {
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
})

app.listen(8080, () => {
    console.log("O servidor está rodando!");
});