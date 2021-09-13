const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("wishlist.db");

// コメントわかるように書いて
/* ホームのページ */
router.get("/", (req, res) => {
  try {
    db.serialize(() => {
      db.all("select * from wishlist", (err, rows) => {
        if (!err) {
          const data = {
            title: "Wish List",
            content: rows,
          };
          res.render("wishlist", data);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// try catchで囲む
/* 検索 */
router.get("/search", (req, res) => {
  try {
    const keyword = req.query;
    db.serialize(() => {
      db.all(
        `select * from wishlist where wish LIKE "%${keyword.wish}%"`,
        (err, rows) => {
          if (!err) {
            const data = {
              title: "Wish List",
              content: rows,
            };
            res.render("wishlist", data);
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

// これが何してるかコメント
/* 検索のページ */
router.get("/add", (req, res) => {
  const data = {
    title: "Wish List",
  };
  res.render("add", data);
});

// 日本語で簡潔に説明
// 全部next消す
/* 編集のページ */
router.get("/edit", (req, res) => {
  const data = {
    title: "Wish List",
  };
  res.render("edit", data);
});

// try catchで囲む
/* 新規登録 */
router.post("/", (req, res) => {
  try {
    const { wish, memo, finished } = req.body;
    db.serialize(() => {
      db.exec(
        `insert into wishlist (wish, memo, finished) values("${wish}","${memo}","${finished}")`,
        (stat, error) => {
          res.redirect("/wishlist");
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

// try catchで囲む
/* 編集 */
router.get("/edit/:id", (req, res) => {
  try {
    // 分割代入にする
    const { id } = req.params;
    db.serialize(() => {
      db.get("select * from wishlist where id = ?", [id], (err, row) => {
        if (!err) {
          const data = {
            title: "edit Wish List",
            mydata: row,
          };
          res.render("edit", data);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// try catchで囲む
// 分割代入にする
router.put("/:id", (req, res) => {
  try {
    const { wish, memo, finished } = req.body;
    const { id } = req.params;
    console.log(req.body);
    db.serialize(() => {
      db.exec(
        `update wishlist set wish="${wish}", memo="${memo}", finished="${finished}" where id="${id}"`,
        (stat, error) => {
          res.redirect("/wishlist");
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

/* delete */
// 分割代入にする
// try catchで囲む
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    db.serialize(() => {
      db.exec(`delete from wishlist where id="${id}"`, (stat, error) => {
        res.redirect("/wishlist");
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
