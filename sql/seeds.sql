DELETE FROM awards; DELETE FROM actors;

INSERT INTO awards (id, year, title, winner_id)
VALUES 

(17, 2019, 'ACTOR IN A LEADING ROLE', NULL),
(18, 2019, 'ACTOR IN A SUPPORTING ROLE', NULL),
(19, 2019, 'ACTRESS IN A LEADING ROLE', NULL),
(20, 2019, 'ACTRESS IN A SUPPORTING ROLE', NULL),

(13, 2018, 'ACTOR IN A LEADING ROLE', 1291),
(14, 2018, 'ACTOR IN A SUPPORTING ROLE', 1259),
(15, 2018, 'ACTRESS IN A LEADING ROLE', 1297),
(16, 2018, 'ACTRESS IN A SUPPORTING ROLE', 1302),

(9, 2017, 'ACTOR IN A LEADING ROLE', 1277),
(10, 2017, 'ACTOR IN A SUPPORTING ROLE', 1282),
(11, 2017, 'ACTRESS IN A LEADING ROLE', 1284),
(12, 2017, 'ACTRESS IN A SUPPORTING ROLE', 1287);

-- (5, 2016, 'ACTOR IN A LEADING ROLE', 1254),
-- (6, 2016, 'ACTOR IN A SUPPORTING ROLE', 1259),
-- (7, 2016, 'ACTRESS IN A LEADING ROLE', 1267),
-- (8, 2016, 'ACTRESS IN A SUPPORTING ROLE', 1269),

-- (1, 2015, 'ACTOR IN A LEADING ROLE', 1236),
-- (2, 2015, 'ACTOR IN A SUPPORTING ROLE', 1242),
-- (3, 2015, 'ACTRESS IN A LEADING ROLE', 1245),
-- (4, 2015, 'ACTRESS IN A SUPPORTING ROLE', 1252);

INSERT INTO actors (id, full_name)
VALUES 
-- (1234, 'Bryan Cranston'),
-- (1235, 'Matt Damon'),
-- (1236, 'Leonardo DiCaprio'),
-- (1237, 'Michael Fassbender'),
-- (1238, 'Eddie Redmayne'),
-- (1239, 'Christian Bale'),
-- (1240, 'Tom Hardy'),
-- (1241, 'Mark Ruffalo'),
-- (1242, 'Mark Rylance'),
-- (1243, 'Sylvester Stallone'),
-- (1244, 'Cate Blanchett'),
-- (1245, 'Brie Larson'),
-- (1246, 'Jennifer Lawrence'),
-- (1247, 'Charlotte Rampling'),
-- (1248, 'Saoirse Ronan'),
-- (1249, 'Jennifer Jason Leigh'),
-- (1250, 'Rooney Mara'),
-- (1251, 'Rachel McAdams'),
-- (1252, 'Alicia Vikander'),
-- (1253, 'Kate Winslet'),
-- (1254, 'Casey Affleck'),
-- (1255, 'Andrew Garfield'),
-- (1256, 'Ryan Gosling'),
-- (1257, 'Viggo Mortensen'),
-- (1258, 'Denzel Washington'),
(1259, 'Mahershala Ali'),
(1260, 'Jeff Bridges'),
(1261, 'Lucas Hedges'),
(1262, 'Dev Patel'),
(1263, 'Michael Shannon'),
(1264, 'Isabelle Huppert'),
(1265, 'Ruth Negga'),
(1266, 'Natalie Portman'),
(1267, 'Emma Stone'),
(1268, 'Meryl Streep'),
(1269, 'Viola Davis'),
(1270, 'Naomie Harris'),
(1271, 'Nicole Kidman'),
(1272, 'Octavia Spencer'),
(1273, 'Michelle Williams'),
(1274, 'Timothée Chalamet'),
(1275, 'Daniel Day-Lewis'),
(1276, 'Daniel Kaluuya'),
(1277, 'Gary Oldman'),
(1278, 'Willem Dafoe'),
(1279, 'Woody Harrelson'),
(1280, 'Richard Jenkins'),
(1281, 'Christopher Plummer'),
(1282, 'Sam Rockwell'),
(1283, 'Sally Hawkins'),
(1284, 'Frances McDormand'),
(1285, 'Margot Robbie'),
(1286, 'Mary J. Blige'),
(1287, 'Allison Janney'),
(1288, 'Lesley Manville'),
(1289, 'Laurie Metcalf'),
(1290, 'Bradley Cooper'),
(1291, 'Rami Malek'),
(1292, 'Adam Driver'),
(1293, 'Sam Elliott'),
(1294, 'Richard E. Grant'),
(1295, 'Yalitza Aparicio'),
(1296, 'Glenn Close'),
(1297, 'Olivia Colman'),
(1298, 'Lady Gaga'),
(1299, 'Melissa McCarthy'),
(1300, 'Amy Adams'),
(1301, 'Marina de Tavira'),
(1302, 'Regina King'),
(1303, 'Rachel Weisz');