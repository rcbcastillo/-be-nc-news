\c nc_news

/* {
    title: "Running a Node App",
    topic: "coding",
    author: "jessjelly",
    body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
    created_at: 1604728980000,
    votes: 0,
  }*/


SELECT articles.*, COUNT(comments.article_id) as comment_count
FROM articles 
LEFT JOIN comments
ON comments.article_id = articles.article_id
WHERE articles.article_id = 1
GROUP BY 1;