rm(list = ls())
library(jsonlite)
library(ggplot2)
source("/Users/ericang/Documents/Courses/Psych254/zt12rp/data_analysis/helper/useful.R")

raw.data.path <- "/Users/ericang/Documents/Courses/Psych254/zt12rp/production-results/"
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
  jso1$subid <- file.name
  
  ## now here's where data get bound together
  all.data <- rbind(all.data, jso1)
}

### FILTER criteria:
## 1. exclude participants who make errors that are 3 SDs above the mean errors of the majority group

jso_sub <- all.data %>% 
  group_by(subid, correct) %>% 
  summarise(count = n()) %>% 
  filter(correct == 0) 

mean = mean(jso_sub$count)
sd = sd(jso_sub$count)
filter(jso_sub, count > mean + 3*sd)

# need to filter: pilot_B4.json, ztrp87.json

## 2. exclude participants who have average reaction times that are 4 SDs higher than the mean of the remaining participants

jso_sub <- all.data %>% 
  group_by(subid) %>% 
  summarise(mean_rt = mean(rt)) 

mean = mean(jso_sub$mean_rt)
sd = sd(jso_sub$mean_rt)
filter(jso_sub, mean_rt > mean + 4*sd)

# need to filter: none

## 3. Exclude each participant’s incorrect responses

## 4. Exclude responses that took response time that is greater than 3 SDs above the overall mean response time

jso_final <- all.data %>%
  filter(subid != "pilot_B4.json" & subid != "ztrp87.json") %>%
  filter(correct == 1) %>%
  filter(rt < mean + 3*sd) %>%
  mutate(inv_rt = 1/rt)

# histogram
qplot(rt, data = jso_final, geom = "histogram")
qplot(rt, data = jso_final, geom = "histogram", facets = ~cond)

qplot(inv_rt, data = jso_final, geom = "histogram")
qplot(inv_rt, data = jso_final, geom = "histogram", facets = ~cond, binwidth = .0001)

# plot of the means
jso_ms <- jso_final %>% 
  filter(correct == 1) %>%
  filter(cond != "ap") %>%
  group_by(cond) %>%
  summarise(rt = mean(rt), na.rm = TRUE)

jso_mss <- jso_final %>% 
  filter(correct == 1) %>%
  filter(cond != "ap") %>%
  group_by(cond, subid) %>%
  summarise(rt = mean(rt), na.rm = TRUE)

jso_ms$cih <- aggregate(rt ~ cond, jso_mss, ci.high)$rt
jso_ms$cil <- aggregate(rt ~ cond, jso_mss, ci.low)$rt


jso_ms$cond <- as.factor(jso_ms$cond)
levels(jso_ms$cond) <- c("dominant-dominant", "dominant-submissive", "submissive-submissive")


p1 <- ggplot(data = jso_ms,
             aes(x=cond, y=rt, fill=cond)) +
  geom_bar(stat="identity", position=position_dodge()) +
  geom_errorbar(aes(ymin=rt-cil, ymax=rt+cih),
                width=.2,
                position=position_dodge(.9)) +
  #  coord_cartesian(ylim=c(.9,6)) +
#  scale_y_continuous(breaks=1:6) +
  xlab("Condition") + 
  ylab("Reaction time") +
  ggtitle("Reaction times for identification")
p1

# anova
fit <- aov(rt ~ cond + Error(subid/cond),data=jso_mss)
summary(fit)

# lmer
jso_mss <- jso_final %>% 
  filter(correct == 1) %>%
  filter(cond != "ap") %>%
  mutate(item = substr(leftPic, 1, nchar(leftPic)-1)) %>%
  group_by(cond, subid, item) %>%
  summarise(rt = mean(rt), na.rm = TRUE)

jso_mss$cond <- as.factor(jso_mss$cond)
jso_mss$cond <- relevel(jso_mss$cond, "ds")
lmer <- lmer(rt ~ cond + (1 | subid) + (1 | item), data = jso_mss)
summary(lmer)


## inverse reaction time

jso_ms <- jso_final %>% 
  filter(correct == 1) %>%
  filter(cond != "ap") %>%
  group_by(cond) %>%
  summarise(inv_rt = mean(inv_rt), na.rm = TRUE)

jso_mss <- jso_final %>% 
  filter(correct == 1) %>%
  filter(cond != "ap") %>%
  group_by(cond, subid) %>%
  summarise(inv_rt = mean(inv_rt), na.rm = TRUE)

jso_ms$cih <- aggregate(inv_rt ~ cond, jso_mss, ci.high)$inv_rt
jso_ms$cil <- aggregate(inv_rt ~ cond, jso_mss, ci.low)$inv_rt


jso_ms$cond <- as.factor(jso_ms$cond)
levels(jso_ms$cond) <- c("dominant-dominant", "dominant-submissive", "submissive-submissive")


p1 <- ggplot(data = jso_ms,
             aes(x=cond, y=inv_rt, fill=cond)) +
  geom_bar(stat="identity", position=position_dodge()) +
  geom_errorbar(aes(ymin=inv_rt-cil, ymax=inv_rt+cih),
                width=.2,
                position=position_dodge(.9)) +
  #  coord_cartesian(ylim=c(.9,6)) +
  #  scale_y_continuous(breaks=1:6) +
  xlab("Condition") + 
  ylab("Average inverse reaction time") +
  ggtitle("Reaction times for identification")
p1

## ANOVA
fit <- aov(inv_rt ~ cond + Error(subid/cond),data=jso_mss)
summary(fit)

## lmer?
jso_mss <- jso_final %>% 
  filter(correct == 1) %>%
  filter(cond != "ap") %>%
  mutate(item = substr(leftPic, 1, nchar(leftPic)-1)) %>%
  group_by(cond, subid, item) %>%
  summarise(inv_rt = mean(inv_rt), na.rm = TRUE)
  
jso_mss$cond <- as.factor(jso_mss$cond)
jso_mss$cond <- relevel(jso_mss$cond, "ds")
lmer <- lmer(inv_rt ~ cond + (1 | subid) + (1 | item), data = jso_mss)
summary(lmer)



## comparison with original data
# plot of the means
jso_ms <- jso_final %>% 
  filter(correct == 1) %>%
  filter(cond != "ap") %>%
  group_by(cond) %>%
  summarise(rt = mean(rt), na.rm = TRUE)

jso_mss <- jso_final %>% 
  filter(correct == 1) %>%
  filter(cond != "ap") %>%
  group_by(cond, subid) %>%
  summarise(rt = mean(rt), na.rm = TRUE)

jso_ms$cih <- aggregate(rt ~ cond, jso_mss, ci.high)$rt
jso_ms$cil <- aggregate(rt ~ cond, jso_mss, ci.low)$rt


jso_ms$cond <- as.factor(jso_ms$cond)
levels(jso_ms$cond) <- c("dominant-dominant", "dominant-submissive", "submissive-submissive")

jso_ms$expt <- "rp"
jso_ms$na.rm <- NULL



orig <- read.table(header=T, text='
        cond                  rt      cih     cil     expt
        dominant-dominant     507.19  13.89  13.89  orig
        dominant-submissive   459.32  12.82  12.82  orig
        submissive-submissive 462.22  13.17  13.17  orig
 ')

rp <- rbind(jso_ms, orig)

rp$expt <- as.factor(rp$expt)
levels(rp$expt) <- c("Original", "Replication")
levels(rp$cond) <- c("both dominant","dominant-submissive", "both submissive") 

p1 <- ggplot(data = rp,
             aes(x=cond, y=rt, fill=cond)) +
  geom_bar(stat="identity", position=position_dodge()) +
  geom_errorbar(aes(ymin=rt-cil, ymax=rt+cih),
                width=.2,
                position=position_dodge(.9)) +
  facet_grid(.~expt) +
  #  coord_cartesian(ylim=c(.9,6)) +
  #  scale_y_continuous(breaks=1:6) +
  xlab("Condition") + 
  ylab("Reaction time") +
  ggtitle("Reaction times for identification")
p1