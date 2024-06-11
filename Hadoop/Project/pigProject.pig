-- Load the input data
inputDialogues4 = LOAD 'hdfs:///user/debnathpal/inputs/episodeIV_dialogues.txt' USING PigStorage('\t') AS (name:chararray, line:chararray);
inputDialogues5 = LOAD 'hdfs:///user/debnathpal/inputs/episodeV_dialogues.txt' USING PigStorage('\t') AS (name:chararray, line:chararray);
inputDialogues6 = LOAD 'hdfs:///user/debnathpal/inputs/episodeVI_dialogues.txt' USING PigStorage('\t') AS (name:chararray, line:chararray);

-- Filter out the first 2 lines from each file
ranked4 = RANK inputDialogues4;
OnlyDialogues4 = FILTER ranked BY (rank_inputDialogues4 > 2);
ranked5 = RANK inputDialogues5;
OnlyDialogues5 = FILTER ranked BY (rank_inputDialogues5 > 2);
ranked6 = RANK inputDialogues6;
OnlyDialogues6 = FILTER ranked BY (rank_inputDialogues6 > 2);

-- Merge the three inputs
inputData = UNION OnlyDialogues4, OnlyDialogues5, OnlyDialogues6;

-- Group by name
groupByName = GROUP inputData BY name;

-- Count the number of lines by each character
names = FOREACH groupByName GENERATE $0 as name, COUNT($1) as no_of_lines;
namesOrdered = ORDER names BY no_of_lines DESC;

-- Remove the outputs folder
rmf hdfs:///user/debnathpal/outputs;

-- Store result in hdfs
STORE namesOrdered INTO 'hdfs:///user/debnathpal/outputs' USING PigStorage('\t');
