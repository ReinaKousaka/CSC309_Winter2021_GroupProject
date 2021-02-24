//this file contains the data and helper functions related to question posts

// question posts info
var questions = [
    {
        ID: 1,
        summary: "What devil fruit did Sabo eat?",
        description: "",
        likeCount: 12,
        replyCount: 2,
        status: "Resolved",
        asker: "onepiecelover",
        lastAnswerer: "asdfgh",
        reward: 0,
        levelLimit: 0
    },
    {
        ID: 2,
        summary: "How long does it take for a single Anime episode to be made?",
        description: "",
        likeCount: 71,
        replyCount: 3,
        status: "Resolved",
        asker: "20years-lonely",
        lastAnswerer: "aniMayor",
        summary: "What would be the top three anime?",
        description: "imo one piece, naruto and bleach ^_^",
        likeCount: 233,
        replyCount: 5,
        status: "Ongoing",
        asker: "user",
        lastAnswerer: "",
        reward: 0,
        levelLimit: 0
    },
    {
        ID: 3,
        summary: "Classroom of elite similar?",
        description: "Hello I was a huge fan of classroom of elite and wanted to know if their r any similar animes maybe give a few cause there is a chance I already saw some similar. Thanks.",
        likeCount: 13,
        replyCount: 1,
        status: "Resolved",
        asker: "Zoomer",
        lastAnswerer: "Liszt",
        reward: 0,
        levelLimit: 0
        //add more
    },
    {
        ID: 4,
        summary: "Is Detective Conan ever going to end?",
        description: "Hello, I am a huge fan of Case Closed. Is Detective Conan ever going to end?",
        likeCount: 12,
        replyCount: 1,
        status: "Resolved",
        asker: "timf",
        lastAnswerer: "Zoe",
        reward: 10,
        levelLimit: 5
        //add more
    },
    {
        ID: 5,
        summary: "why one punch man season 2 is bad?",
        description: "I love One Punch Man. but I noticed that the season two is too lame..why one punch man season 2 is that bad?",
        likeCount: 10,
        replyCount: 2,
        status: "Resolved",
        asker: "alliez",
        lastAnswerer: "Jason",
        reward: 5,
        levelLimit: 5
        //add more
    },
    {
        ID: 6,
        summary: "why one punch man is so strong?",
        description: "Why one punch man is so strong? He is just a human.",
        likeCount: 5,
        replyCount: 1,
        status: "Resolved",
        asker: "Lee",
        lastAnswerer: "Coco",
        reward: 5,
        levelLimit: 0
        //add more
    }

];

// 
var answers = [
    {
        ID: 1,
        questionID: 1,
        answerer: "asdfgh",
        content: "Mera Mera no Mi",
        likeCount: 6,
        status: "Accepted",
    },
    {   
        ID: 2,
        questionID: 1,
        answerer: "noob",
        content: "who is Sabo?",
        likeCount: 0,
        status: "",
    },
    {
        ID: 3,
        questionID: 2,
        answerer: "steven",
        content: "It takes around 8-12 months to make an episode but animators work simultaneously on other episodes as well. Usually, they complete only 3-4 episodes before the release of the season and completes the other episodes as the season moves on.",
        likeCount: 90,
        status: "Accepted",
    },
    {
        ID: 4,
        questionID: 2,
        answerer: "asdfgh",
        content: "CODE GEASS, DEATH NOTE, HUNTER X HUNTER </br> yea I'm an old anime fan hah",
        likeCount: 54,
        status: "",
    },
    {
        ID: 5,
        questionID: 2,
        answerer: "Crosswrm",
        content: "I remember some discussions about Dragon Ball Super when it was airing, and some producers said it could take 6+ months to make an episode",
        likeCount: 6,
        status: "",
    },
    {
        ID: 6,
        questionID: 2,
        answerer: "aniMayor",
        content: "From what I got from shirobako, I'd say that it'd take a few months",
        likeCount: 50,
        status: "",
    },
    {
        ID: 7,
        questionID: 3,
        answerer: "Liszt",
        content: "See if any of these anime interest you:<br/> 1. Death Parade 2. Danganronpa: The Animation 3.The Money and Soul of Possibility 4.The Fruit of Grisaia,",
        likeCount: 11,
        status: "",
        answerer: "onepiecelover",
        content: "one piece, one piece and one piece",
        likeCount: 168,
        status: "",
    },
    {   
        ID: 8,
        questionID: 4,
        answerer: "zoegoodgood",
        content: "The manga itself is still being released and will be releasing by the end of 2019 so episodes will be releasing by 2020 until a new manga episode of 2020 releases. This cycle will keep on going until Gosho Ayoma says so.",
        likeCount: 5,
        status: "",
    },
    {   
        ID: 9,
        questionID: 5,
        answerer: "james_h",
        content: "Yes, I wonderee why too.",
        likeCount: 6,
        status: "",
    },
    {   
        ID: 10,
        questionID: 5,
        answerer: "jason_z",
        content: "The biggest reason why the animation sucked was due to the lack of production time. When you get less time to work on stuff, you have to cut around corners. This is why most of the stuff from One Punch Man Season 2 wasn't close to the level of One Punch Man Season 1.",
        likeCount: 16,
        status: "Accepted",
    },

    {   
        ID: 11,
        questionID: 6,
        answerer: "coco1998",
        content: "Saitama got so strong because he broke his limiter. The limiter, limits what is possible for someone until their growth eventually hits a wall and they are no longer capable of reaching new heights. Basically a man could be able to lift 1000 lbs and that would be his limit.",
        likeCount: 10,
        status: "Accepted",
    },
    




    {
        //add more
    }
];

// return the object given question ID
//function get_question(ID) { }

// return the object given answer ID
//function get_answer(ID) { }


// other potential to-do functions:
// sort questions by xx order

