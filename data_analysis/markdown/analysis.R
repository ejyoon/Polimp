rm(list = ls())
library(jsonlite)
library(ggplot2)
library(tidyr)
source("/Users/ericang/Documents/Research/Politeness/experiment/2_code/data_analysis/helper/useful.R")

raw.data.path <- "/Users/ericang/Documents/Research/Politeness/experiment/2_code/production-results/"
processed.data.path <- "/Users/ericang/Documents/Courses/Psych254/zt12rp/data_analysis/processed_data/"

## LOOP TO READ IN FILES
all.data <- data.frame()
files <- dir(raw.data.path,pattern="*.json")

for (file.name in files) {
  print(file.name)
  
  ## these are the two functions that are most meaningful
  json_file <- readLines(paste(raw.data.path,file.name,sep=""))
  json_file_str = paste(json_file, collapse = "")
  json_file_str = gsub(",}", "}", json_file_str)
  jso = jsonlite::fromJSON(json_file_str)
  jso1 <- data.frame(jso)
  jso1$subid <- substring(file.name, 1, 6)
  
  ## now here's where data get bound together
  all.data <- rbind(all.data, jso1)
}

levels(all.data$answer.scale) <- c("hateA_alsoHateB", "hateA_butLoveB", "loveA_butHateB", "loveA_alsoLoveB", "someHate_alsoAllHate", "someHate_butNotAllHate", "someLove_butNotAllLove", "someLove_alsoAllLove", "training1", "training2")
levels(all.data$answer.judgment) <- c("No", "Maybe", "Yes")

# filter
d <- all.data %>%
  select(subid, answer.scale, answer.judgment) %>%
  filter(answer.scale != "training1" & answer.scale != "training2") %>%
  separate(answer.scale, into = c("utterance", "inference"), sep = "_") 

d$inference <- as.factor(d$inference)

d <- d %>%
  mutate(bound = substring(inference, 1, 3))
d$bound <- as.factor(d$bound)
levels(d$bound) <- c("lower", "upper")

# histogram: rt
qplot(answer.judgment, data = d, geom = "histogram") # across all cond
qplot(answer.judgment, data = d, geom = "histogram") +
  facet_wrap(utterance~inference, ncol=2) # across all cond

# bar graph
levels(d$answer.judgment) <- c(-1, 0, 1)
d$answer.judgment <- as.numeric(as.character(d$answer.judgment))

# plot of the means
mss <- d %>% 
  group_by(utterance, bound, subid) %>%  
  summarise(judgment = mean(answer.judgment), na.rm = TRUE)

ms <- mss %>% 
  group_by(utterance, bound) %>%
  summarise(judgment = mean(judgment), na.rm = TRUE)


ms$cih <- aggregate(judgment ~ utterance + bound, mss, ci.high)$judgment
ms$cil <- aggregate(judgment ~ utterance + bound, mss, ci.low)$judgment

ms$utterance <- as.factor(ms$utterance)
levels(ms$utterance) <- c("\"people hated A\" -> infer about B?", "\"people loved A\" -> infer about B?", "\"some hated A\" -> infer about all?", "\"some loved A\" -> infer about all?")
levels(ms$bound) <- c("also ~", "not ~")

p1 <- ggplot(data = ms,
             aes(x=bound, y=judgment, fill=bound)) +
  geom_bar(stat="identity", position=position_dodge()) +
  facet_wrap(~utterance) +
  geom_errorbar(aes(ymin=judgment-cil, ymax=judgment+cih),
                width=.2,
                position=position_dodge(.9)) +
  xlab("Inference") + 
  ylab("Judgment that inference is correct") +
  ggtitle("Judgments for sentence interpretation")
p1

mss$utterance <- as.factor(ms$utterance)
levels(mss$utterance) <- c("\"people hated A\" -> infer about B?", "\"people loved A\" -> infer about B?", "\"some hated A\" -> infer about all?", "\"some loved A\" -> infer about all?")
levels(mss$bound) <- c("also ~", "not ~")

p1 <- ggplot(data = mss,
             aes(x=judgment)) +
  geom_histogram(binwidth=1, , origin = -1.5) +
  facet_grid(utterance~bound) +
  #geom_errorbar(aes(ymin=judgment-cil, ymax=judgment+cih),
                #width=.2,
                #position=position_dodge(.9)) +
  xlab("Inference") + 
  ylab("Judgment that inference is correct") +
  ggtitle("Judgments for sentence interpretation")
p1



