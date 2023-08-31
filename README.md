# [Fast Food Nutrition](https://fastfood-nutrition-site.vercel.app/)
## Note: because the backend is hosted on the free tier of Render, the pages which require database queries will take 2-3 minutes to load while backend spins back up
This website is composed of three parts:
1. Databse - A relational database hosted on Amazon AWS RDS containing information about fastfood nutrition
2. Backend - A backend hosted on Render which queries the database upon api requests
3. Frontend - Displays information from the database in dashboards and tables, makes calls to the backend, hosted [here](https://fastfood-nutrition-site.vercel.app/) with Vercel
