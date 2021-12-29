const router = require("express").Router();
const { Post, User, Like } = require("../../models");

// GET ALL posts
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "fweet", "created_at"],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a SPECIFIC post
router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "fweet", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a Post
router.post("/", (req, res) => {
  Post.create({
    fweet: req.body.fweet,
    user_id: req.body.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a Like by UPDATING a Post
router.put('/uplike', (req, res) => {
    Like.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.json(err));
})

// UPDATE a Post
router.put("/:id", (req, res) => {
  Post.update(
    {
      fweet: req.body.fweet,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// DELETE a Post
router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;
