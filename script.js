const storyText = document.getElementById('story-text');
const choicesDiv = document.getElementById('choices');
const homeDiv = document.getElementById('home');
const storyDiv = document.getElementById('story');
const nextButton = document.getElementById('next-button');

let currentStoryPart = '';
let isMuted = false; // Flag to track mute status
let lastSpokenText = ''; // Store last spoken text


const stories = {
    lostKitten: {
        text: "One sunny afternoon, a kind-hearted girl named Mia was walking home from school when she heard a soft meowing sound. Curious, she followed the sound and found a tiny kitten stuck in a bush. It looked scared and hungry. What should she do?",
        choices: [
            { text: "Take the kitten home", next: 'takeHome' },
            { text: "Ignore it and walk away", next: 'ignore' }
        ]
    },
    takeHome: {
        text: "Mia gently picked up the kitten and took it home. She named it Whiskers. At home, she gave Whiskers some food and water. The kitten purred happily, feeling safe and loved. Mia felt warm inside. What should she do next?",
        choices: [
            { text: "Play with Whiskers", next: 'playWithWhiskers' },
            { text: "Look for its owner", next: 'findOwner' },
            { text: "Draw a picture of Whiskers", next: 'drawPicture' }
        ]
    },
    ignore: {
        text: "Mia walked away, trying to forget about the kitten. But the meowing echoed in her mind. She felt guilty. Finally, she decided to go back. What should she do when she finds the kitten again?",
        choices: [
            { text: "Take the kitten home", next: 'takeHome' },
            { text: "Call for help", next: 'callForHelp' }
        ]
    },
    playWithWhiskers: {
        text: "Mia played with Whiskers all afternoon. They chased each other around the garden and played with strings and balls. Suddenly, Mia heard a knock on the door. It was a little boy looking worried. He said, 'I lost my kitten! Have you seen it?'",
        choices: [
            { text: "Tell him I found his kitten", next: 'returnKitten' },
            { text: "Hide the kitten", next: 'hideKitten' }
        ]
    },
    returnKitten: {
        text: "Mia smiled and picked up Whiskers. 'This is your kitten! I found him!' The boy's face lit up with joy. 'Thank you so much!' He hugged the kitten tightly. They decided to play together.",
        choices: [
            { text: "Have a fun playdate", next: 'playdate' },
            { text: "Go to the park together", next: 'parkTogether' }
        ]
    },
    parkTogether: {
        text: "Mia and the boy took Whiskers to the park. They ran around and played games. They made new friends who wanted to join them. Everyone had fun!",
        choices: [
            { text: "Have a picnic at the park", next: 'picnicAtPark' },
            { text: "Play hide and seek", next: 'hideAndSeek' }
        ]
    },
    picnicAtPark: {
        text: "Mia, the boy, and their friends spread out a blanket and shared sandwiches and juice. They laughed and told stories under the shade of a big tree.",
        end: "They learned that sharing meals together brings people closer and makes everyone happy."
    },
    hideAndSeek: {
        text: "They decided to play hide and seek. Mia counted to twenty while everyone else hid. Whiskers curled up in a sunny spot, making it hard to find him!",
        end: "Mia learned that fun games can create happy memories."
    },
    playdate: {
        text: "Mia and the boy played with Whiskers, teaching him new tricks. They laughed and enjoyed their time together. Later, they sat under a tree to rest.",
        choices: [
            { text: "Talk about their favorite animals", next: 'talkAboutAnimals' },
            { text: "Make up a funny story", next: 'funnyStory' }
        ]
    },
    talkAboutAnimals: {
        text: "They shared stories about their pets and their favorite animals. The boy had a dog named Buddy, and Mia loved birds.",
        end: "They learned that talking about things they love helps them connect with others."
    },
    funnyStory: {
        text: "They made up a silly story about a cat who wanted to be a dog. They laughed so much that they almost fell over!",
        end: "Mia learned that creativity can bring joy and laughter."
    },
    hideKitten: {
        text: "Mia felt scared that if she returned the kitten, she would lose her new friend. She decided to hide Whiskers behind her back. The boy looked sad and left without his kitten.",
        end: "Mia learned that being selfish doesn't bring true happiness."
    },
    findOwner: {
        text: "Mia looked for the owner and found a flyer in the neighborhood. The kitten belonged to a little boy named Sam who had been searching everywhere for it. She took Whiskers to Sam’s house.",
        choices: [
            { text: "Give Whiskers back to Sam", next: 'giveBack' },
            { text: "Ask Sam to keep Whiskers", next: 'askToKeep' }
        ]
    },
    giveBack: {
        text: "Sam was very grateful and thanked Mia for bringing his kitten home. Mia felt proud of her decision.",
        end: "Mia learned that kindness always pays off."
    },
    askToKeep: {
        text: "Mia asked Sam if he could keep Whiskers, but Sam said, 'I missed him too much! He belongs with me.'",
        end: "Mia learned that sometimes letting go is the kindest thing to do."
    },
    callForHelp: {
        text: "Mia called her parents, who helped her take the kitten home. They looked for the owner together and found a flyer. The kitten belonged to a little boy named Sam.",
        end: "Mia felt proud that they could return Whiskers to its home. She learned that it’s okay to ask for help."
    },
    drawPicture: {
        text: "Mia decided to draw a picture of Whiskers. She got her colors and began to create. The picture turned out great!",
        choices: [
            { text: "Show it to her parents", next: 'showParents' },
            { text: "Hang it in her room", next: 'hangInRoom' }
        ]
    },
    showParents: {
        text: "Her parents loved the drawing! They praised her for her creativity. They suggested they all go out to celebrate.",
        end: "Mia learned that sharing her achievements makes them feel even more special."
    },
    hangInRoom: {
        text: "Mia decided to hang it in her room. Every time she saw it, she remembered her adventure with Whiskers.",
        end: "Mia learned that memories are treasures that we can keep forever."
    },

    magicalGarden: {
        text: "In a beautiful village, a group of friends discovered a magical garden filled with colorful flowers and singing birds. They were excited to explore, but they noticed that the garden was messy. What should they do?",
        choices: [
            { text: "Work together to clean up the garden", next: 'cleanGarden' },
            { text: "Leave it as it is", next: 'leaveGarden' }
        ]
    },
    cleanGarden: {
        text: "The friends decided to work together. They cleaned up the trash, watered the plants, and planted new flowers. Soon, the garden looked amazing! They felt proud of their work.",
        choices: [
            { text: "Have a picnic in the garden", next: 'picnic' },
            { text: "Invite everyone to see the garden", next: 'inviteEveryone' },
            { text: "Create a sign for the garden", next: 'createSign' }
        ]
    },
    leaveGarden: {
        text: "The friends decided to leave the garden as it was. They played games and had fun, but they felt something was missing. They sat down to talk about it.",
        choices: [
            { text: "Decide to clean it up", next: 'cleanGarden' },
            { text: "Find someone else to help", next: 'findHelp' }
        ]
    },
    picnic: {
        text: "After cleaning, the friends had a delightful picnic in the beautiful garden. They enjoyed sandwiches and juice, and shared stories and laughter.",
        end: "They learned that teamwork makes work easier and more fun!"
    },
    inviteEveryone: {
        text: "They invited everyone in the village to come and see the beautiful garden. People were amazed and came to help maintain it.",
        end: "They learned that sharing their hard work with others made the garden even more special."
    },
    createSign: {
        text: "They made a colorful sign that read, 'Welcome to the Magical Garden!' and placed it at the entrance. It made everyone smile.",
        end: "They learned that creativity can bring joy to others."
    },
    findHelp: {
        text: "They decided to find someone else to help clean the garden. When they asked the village kids, many joined in. Together, they made the garden beautiful.",
        end: "They learned that asking for help can make a big difference."
    },
    
    braveRobot: {
        text: "A little robot named Robo was scared of the dark but wanted to explore the night sky. His friends encouraged him. What should he do?",
        choices: [
            { text: "Stay in the safe zone", next: 'staySafe' },
            { text: "Take a step into the dark", next: 'stepIntoDark' }
        ]
    },
    staySafe: {
        text: "Robo decided to stay where it was safe, but he felt lonely. He watched his friends play in the dark, having fun. After a while, he wanted to join them.",
        choices: [
            { text: "Take a deep breath and go out", next: 'joinFriends' },
            { text: "Continue to stay back", next: 'stayBack' }
        ]
    },
    joinFriends: {
        text: "Robo took a deep breath and stepped into the dark, discovering glowing stars and friendly creatures! He felt a rush of excitement.",
        choices: [
            { text: "Explore with friends", next: 'exploreWithFriends' },
            { text: "Help a lost star find its way", next: 'helpLostStar' }
        ]
    },
    exploreWithFriends: {
        text: "Robo and his friends explored the dark forest filled with wonders. They found glowing flowers and learned new things about the night sky.",
        end: "Robo learned that facing fears can lead to wonderful discoveries."
    },
    helpLostStar: {
        text: "Robo saw a lost star flickering sadly. He approached it and asked, 'What’s wrong?' The star said it lost its way home. Robo and his friends decided to help.",
        choices: [
            { text: "Follow the star's light", next: 'followStarLight' },
            { text: "Ask other stars for directions", next: 'askOtherStars' }
        ]
    },
    followStarLight: {
        text: "They followed the star’s light, which led them to a beautiful glade. There, they found a group of friendly stars waiting for their lost friend!",
        end: "Robo learned that helping others can create new friendships."
    },
    askOtherStars: {
        text: "They asked the other stars, who were happy to help. They all shone bright, guiding the lost star back to its home. Everyone celebrated together!",
        end: "Robo learned that asking for help can bring the community together."
    },
    stayBack: {
        text: "Robo decided to stay back, but he felt sad watching his friends. He missed out on all the fun. He realized that staying safe sometimes means missing great adventures.",
        end: "Robo learned that facing fears can lead to great rewards."
    },
    stepIntoDark: {
        text: "Robo took a deep breath and stepped into the dark, discovering glowing stars and friendly creatures! He felt brave and excited.",
        choices: [
            { text: "Make a wish on a shooting star", next: 'wishOnStar' },
            { text: "Dance with the fireflies", next: 'danceWithFireflies' }
        ]
    },
    wishOnStar: {
        text: "Robo closed his eyes and made a wish. When he opened them, he saw the star smiling back at him, granting his wish of courage!",
        end: "Robo learned that wishes can come true when you believe in yourself."
    },
    danceWithFireflies: {
        text: "Robo joined the fireflies and danced around in the dark. He felt light and free, surrounded by friends.",
        end: "Robo learned that sometimes, letting go of fear brings joy."
    }
};
function speak(text) {
    if (isMuted) {
        lastSpokenText = text; // Store the text if muted
        return; // Exit if muted
    }
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US'; // Set the language
    speech.rate = 1; // Set speech rate
    speech.pitch = 1; // Set pitch
    window.speechSynthesis.speak(speech);
}

function startStory(story) {
    homeDiv.classList.add('hidden');
    storyDiv.classList.remove('hidden');
    currentStoryPart = story;
    displayStory(story);
}

function displayStory(part) {
    const currentStory = stories[part];
    storyText.innerText = currentStory.text;
    choicesDiv.innerHTML = '';
    nextButton.classList.add('hidden'); // Hide the next button initially

    if (currentStory.choices) {
        currentStory.choices.forEach(choice => {
            const button = document.createElement('button');
            button.innerText = choice.text;
            button.onclick = () => {
                displayStory(choice.next);
                nextButton.classList.remove('hidden'); // Show the next button when a choice is made
            };
            choicesDiv.appendChild(button);
        });
    } else {
        // If there are no choices, the story has ended
        const lesson = document.createElement('p');
        lesson.innerText = "Thank you for reading! You can choose another story.";
        choicesDiv.appendChild(lesson);
        nextButton.innerText = "Next Adventure 🌈"; // Change button text
        nextButton.classList.remove('hidden'); // Show the button to go back to the homepage
    }
}

// Function to redirect to the homepage
nextButton.onclick = () => {
    homeDiv.classList.remove('hidden'); // Show the home page
    storyDiv.classList.add('hidden'); // Hide the story section
};

// Function to toggle mute
function toggleMute() {
    isMuted = !isMuted; // Toggle the mute status
    const muteButton = document.getElementById('mute-button');
    muteButton.innerText = isMuted ? '🔊 Unmute' : '🔇 Mute'; // Update button text

    // Stop any ongoing speech if muted
    if (isMuted) {
        window.speechSynthesis.cancel(); // Stop speech synthesis immediately
    }
}

// Start with the home screen
homeDiv.classList.remove('hidden');
storyDiv.classList.add('hidden');