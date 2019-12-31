# Storify
Application that simplifies the process of building choose-your-own-path experiences. Was inspired by the Netflix movie, "Bandersnatch"

### How it works
Stories are written in my own syntax, which is very easy to learn and requires no coding experience from the user. This story in my syntax is then compiled to a JSON object and can then the story can be viewed.

### Features
  * Write stories
  * Unlimited options at each path
  * Video integration support with Youtube for video experiences
  * Reference to any path arbitrarily using its id
  * Choose-your-own-path story viewer with youtube player support

### Syntax options
Option | Use 
------------ | -------------
&#35; | Separator character
question: | Question value
option: | Option for a question
ref[idVal]: | Refers to the id of a specific path, where idVal is the id number for that item
video: | Youtube video url / id for item

### Syntax tutorial
The syntax is line based. For each story item, a # character is placed in the line before it and after it. The order of these items is what creates the pathway. Below is a sample text only choose-your-own-path story I wrote:

```
#
Jack and Jill went up a hill. They trekked all the way up and Jill got thirsty, he noticed he finished all of his water.
question: What should Jill do?
option: Steal water from Jack
option: Ask water from Jack
#
Jill slowly grabbed Jack's water bottle from his backpack and chugged it all. Jack later noticed his bottle was empty. He immediately knew Jill stole his water.
question: What should Jack do?
option: Kill Jill
option: Nothing
#
Jill politely asked Jack for water and Jack obliged. They continued their journey and were happy.
#
Jack smashed the bottle on Jill's head, killing him.
#
Jack ignored it. They continued their journey and were happy.
#
```
Below is the result of the pathways when the above syntax is compiled and run:

Pathway 1                  |  Pathway 2                | Pathway 3          
:-------------------------:|:-------------------------:|:-------------------------:
![Alt Text](https://raw.githubusercontent.com/wenogk/storifyV2/master/readme-media/gif1.gif)  |  ![Alt Text](https://raw.githubusercontent.com/wenogk/storifyV2/master/readme-media/gif2.gif) |  ![Alt Text](https://raw.githubusercontent.com/wenogk/storifyV2/master/readme-media/gif3.gif)

#### Building experiences with youtube videos
Being inspired by the Netflix show Bandersnatch, I had to implement some type of video solution - I decided to use youtube as it is the quickest one to get running, however I'm looking into other platforms such as vimeo / streamable to have more control of the experience. Below is some syntax that builds a choose your own path, video experience:
```
#
question: Do what?
option: Take her trick or treating
option: Stay home
video: https://www.youtube.com/watch?v=CbhhKmX3Wsg
#
question: -
option: Look for your sister
option: Go after the kid
video: https://www.youtube.com/watch?v=b581T0xY4a8
#
question: -
option: Check out the sound
option: Stay where  you are
video: https://www.youtube.com/watch?v=urZolHaB2EQ
#
video: https://www.youtube.com/watch?v=Pox8DqfhFJs
#
video:https://www.youtube.com/watch?v=6HG-Bsj41Dw
#
video:https://www.youtube.com/watch?v=0bpzcaiFPso
#
video:https://www.youtube.com/watch?v=TcCGbKd6s6U
```
![Alt Text](https://raw.githubusercontent.com/wenogk/storifyV2/master/readme-media/gif4.gif&s=200)



### Future improvements
To build a visual editor, need to use library such as https://jsplumbtoolkit.com/
