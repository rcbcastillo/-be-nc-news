\c nc_news

SELECT articles.*, COUNT(comments.article_id) as comment_count 
  FROM articles
  LEFT JOIN comments
  ON comments.article_id = articles.article_id
  GROUP BY 1
  ORDER BY created_at DESC;
  
  
  

