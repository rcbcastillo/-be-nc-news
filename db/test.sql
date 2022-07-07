\c nc_news



SELECT articles.article_id, COUNT(comments.article_id) as total_comments
FROM articles 
LEFT JOIN comments
ON comments.article_id = articles.article_id
WHERE articles.article_id = 22
GROUP BY 1;
