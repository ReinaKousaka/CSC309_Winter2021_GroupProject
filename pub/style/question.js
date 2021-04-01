let quill = null;

if(window.location.hash) {
    updatePage();
}

// change icon and username in navbar
let self_username = getCookie("username");
let self_profile = get_user_profile(self_username);
document.getElementById("nav_user_profile").src = "images/profilepic/" + self_profile.profilePic + ".jpg";
document.getElementById("nav_username").innerText = self_profile.displayName;

// update page with updated question ID
function updatePage(sort="like") {     // sort range in {"like", "time"}
    let x = location.hash;
    let qID = x.substring(1);
    // let qObject = get_question(qID);

    // use GET route to get the question
    fetch(`/question/${qID}`)
    .then(res => res.json())
    .then(qObject => {
        if(qObject != null) {
            //remove error page if it's there
            if(document.getElementById("error-page") != null) {
                document.getElementById("error-page").remove;
                location.reload();
            }
    
            //get asker info
            let uProfile =  get_user_profile(qObject.asker);
    
            // update asker info DOM
            document.getElementById("asker-icon").src = "images/profilepic/" + uProfile.profilePic + ".jpg";
            document.getElementById("asker-name").innerHTML = '<a href="profile.html#' + uProfile.userID 
                    + '" target="_blank">' +  uProfile.displayName + '</a>';
            document.getElementById("asker-level").innerHTML = "Level: " + uProfile.level;
            
            // update question info DOM
            document.getElementById("question-title").innerHTML = '<b>' + qObject.summary + '</b>';
            document.getElementById("question-status").innerHTML = '[' + qObject.status + ']';
            document.getElementById("question-description").innerHTML = qObject.description;
            document.getElementById("question-reward").innerHTML = 'Reward: ' + qObject.reward;
    
            // get the list of answers
            let answer_list = get_answer_by_question(qID);
            if (sort == "like"){
                answer_list = sort_list_by_like(answer_list);
            }else{
                answer_list.reverse();      // reverse order is the time order
            }
    
            // remove previous answer posts
            remove_answer_posts();
    
            // insert each answer
            if(answer_list.length != 0) {
                insert_answer_posts(answer_list);
                add_event_listener();
            }
    
            //add text editor if question is not resolved
            if(qObject.status != "Resolved") {
                document.getElementById("add-answer-btn").style = "visibility: visible;";
                if(quill == null) {
                    initiate_answer_editor();
                }  
            } else {
                document.getElementById("add-answer-btn").style = "visibility: hidden;";
            }
    
        } else { //if there is no such question
            go_to_error_page();
        }
    })
    .catch(err => {
        console.log('Could not get question');
        console.log(res);
    })
}

// onclick events for sorting 
function sort_by_time() {
    document.getElementById("sort-by-time").style = "text-decoration: underline;"
    document.getElementById("sort-by-like").style = "text-decoration: none;"
    updatePage("time");
}

function sort_by_like() {
    document.getElementById("sort-by-like").style = "text-decoration: underline;"
    document.getElementById("sort-by-time").style = "text-decoration: none;"
    updatePage("like");
}

function sort_list_by_like(answer_list){    // we dont have to sort by time, the originial list is sorted by ID already.
    answer_clone = JSON.parse(JSON.stringify(answer_list));
    answer_clone.sort(function(a, b){
        return b.likeCount - a.likeCount;
    });
    return answer_clone;
}

// remove answer posts container
function remove_answer_posts() {
    let over = false;
    let i = 0;
    while(!over) {
        if(document.getElementById("answer-post-"+i) == null) {
            over = true;
        } else {
            document.getElementById("answer-post-"+i).remove();
            i++;
        }
    }

    //remove self answer
    remove_element_by_ID("self-post");
}

// insert answer posts by the order of given list
function insert_answer_posts(answer_list) {
    let i = 0;
    for(i = 0; i < answer_list.length; i++) {
        // get answerer profile object
        let aProfile = get_user_profile(answer_list[i].answerer);

        // create the DOM for answer post
        let element = document.createElement("div");
        element.className = "post-container";
        element.id = "answer-post-"+i;
        document.getElementById("question-container").appendChild(element);
        element.innerHTML = `
            <div class='post-profile-answerer'>
                <img class='post-profile-icon' id='answerer-icon-${i}' src='//:0'/>
                <div class='post-profile-info'>
                    <div class='display-name' id='answerer-name-${i}'></div> 
                    <div class='user-level' id='answerer-level-${i}'></div>
                </div>
            </div>
            <div class='post-content'>
                <div class="vote_container">
                    <div class="like_button_answer">&#9650</div>
                    <div class="like_num">${answer_list[i].likeCount}</div>
                    <div class="dislike_button_answer">&#9660</div>
                </div>
                <div class='post-description' id='answer-description-${i}'></div>
                <div class ='accept-description' id='answer-accept-${i}'></div>
            </div>`;

        // update answerer info DOM
        document.getElementById("answerer-icon-"+i).src = "images/profilepic/" + aProfile.profilePic + ".jpg";
        document.getElementById("answerer-name-"+i).innerHTML = '<a href="profile.html#' + aProfile.userID 
                + '" target="_blank">' +  aProfile.displayName + '</a>';
        document.getElementById("answerer-level-"+i).innerHTML = "Level: " + aProfile.level;
        
        // update answer info DOM
        document.getElementById("answer-description-"+i).innerHTML = answer_list[i].content;
        if(answer_list[i].accepted) {
            document.getElementById("answer-accept-"+i).innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
        }  
    }
}

// start editor object
function initiate_answer_editor() {
    quill = new Quill('#editor', {
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image']
          ]
        },
        placeholder: 'Enter your answer here',
        theme: 'snow'  
    });
}


// onclick function of "+" button
function open_editor() {
    document.getElementById("editor-window").style = "visibility: visible;";
}

// onclick function of "Cancel" button
function editor_cancel() {
    document.getElementById("editor-window").style = "visibility: hidden;";
}

// onclick function of "Submit" button
function editor_submit() {
    let quillHTML = quill.root.innerHTML;
    const message_element = document.getElementById('editor-message');
    if(quillHTML.length < 10) {
        message_element.style = "color: red;";
        message_element.innerHTML = "Your answer must be greater than 10 characters!";
    } else {
        // TODO: add a new answer, update to server
        // TODO: add 10 exp to user, update to server

        add_self_answer(quillHTML);
        document.getElementById("editor-window").style = "visibility: hidden;";
        document.getElementById("add-answer-btn").style = "visibility: hidden;";
        message_element.style = "color: black;";
        message_element.innerHTML = "Add a new answer";
        //create a notif 
        let notif = document.createElement("div");
        document.body.appendChild(notif);
        notif.innerHTML = `exp + 10`;
        notif.className = "center-notif";
        add_fade(notif);
    }
}


function add_self_answer(HTMLcontent) {
    //TODO: push new answer info to database

    // create the DOM for answer post
    let element = document.createElement("div");
    element.className = "post-container";
    element.id = "self-post";
    document.getElementById("question-container").appendChild(element);
    element.innerHTML = 
        `<div class="post-profile-answerer">
            <img class="post-profile-icon" id="self-icon" src="//:0">
            <div class="post-profile-info">
                <div class="display-name" id="self-name"> </div> 
                <div class="user-level" id="self-level"> </div>
            </div>
        </div>
        <div class="post-content">
            <div class="vote_container">
                    <div class="like_button_answer">&#9650</div>
                    <div class="like_num">0</div>
                    <div class="dislike_button_answer">&#9660</div>
            </div>
            <div class="post-description" id="self-answer-description">  </div>
            <div class="accept-description" id="self-answer-accept"> </div>
        </div>`
    add_event_listener();       // add eventlistener to the new answer buttons

    // update answerer info DOM
    document.getElementById("self-icon").src = "images/profilepic/" + self_profile.profilePic + ".jpg";
    document.getElementById("self-name").innerHTML = '<a href="profile.html#' + self_profile.userID 
            + '" target="_blank">' +  self_profile.displayName + '</a>';
    document.getElementById("self-level").innerHTML = "Level: " + self_profile.level;
    
    // update answer info DOM
    document.getElementById("self-answer-description").innerHTML = HTMLcontent;
}

// function: change cursor to pointer
function cursor_pointer(e){
    e.target.style.cursor = 'pointer';
}

// like & dislike for question  
document.querySelector('.like_button_question').addEventListener('click', like_question);
document.querySelector('.dislike_button_question').addEventListener('click', dislike_question);
document.querySelector('.like_button_question').addEventListener('mouseover', cursor_pointer);
document.querySelector('.dislike_button_question').addEventListener('mouseover', cursor_pointer);

function like_question(e){
    e.preventDefault();
    if (e.target.style.color == 'pink'){        // already clicked, undo it
        e.target.style.color = 'silver';
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) - 1;
        return;   
    }
    e.target.style.color = 'pink';
    // TODO in Phase 2: really modify the data array
    if (e.target.parentElement.children[2].style.color == 'pink'){      // the case dislike is clicked, increase by 2
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) + 2;
    }else{
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) + 1;
    }
    e.target.parentElement.children[2].style.color = 'silver';
}

function dislike_question(e){
    e.preventDefault();
    if (e.target.style.color == 'pink'){        // already clicked, undo it
        e.target.style.color = 'silver';
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) + 1;
        return;   
    }
    e.target.style.color = 'pink';
    // TODO in Phase 2: really modify the data array
    if (e.target.parentElement.children[0].style.color == 'pink'){      // the case like is clicked, decrease by 2
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) - 2;
    }else{  // like is un-clicked, decrease by 1
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) - 1;
    }
    e.target.parentElement.children[0].style.color = 'silver';
}

// NOTE: the following are similar as above, but we will change them in Phase2!!!
// like & dislike for answers

function add_event_listener(){      // a helper function that add event listener to answers vote button
    document.querySelectorAll('.like_button_answer').forEach(element => {
        element.addEventListener('click', like_answer);
        element.addEventListener('mouseover', cursor_pointer);
    });
    
    document.querySelectorAll('.dislike_button_answer').forEach(element => {
        element.addEventListener('click', dislike_answer);
        element.addEventListener('mouseover', cursor_pointer);
    });
}

function like_answer(e){
    e.preventDefault();
    if (e.target.style.color == 'pink'){        // already clicked, undo it
        e.target.style.color = 'silver';
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) - 1;
        return;   
    }
    e.target.style.color = 'pink';
    // TODO in Phase 2: really modify the data array
    if (e.target.parentElement.children[2].style.color == 'pink'){      // the case dislike is clicked, increase by 2
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) + 2;
    }else{
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) + 1;
    }
    e.target.parentElement.children[2].style.color = 'silver';
}

function dislike_answer(e){
    e.preventDefault();
    if (e.target.style.color == 'pink'){        // already clicked, undo it
        e.target.style.color = 'silver';
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) + 1;
        return;   
    }
    e.target.style.color = 'pink';
    // TODO in Phase 2: really modify the data array
    if (e.target.parentElement.children[0].style.color == 'pink'){      // the case like is clicked, decrease by 2
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) - 2;
    }else{  // like is un-clicked, decrease by 1
        e.target.parentElement.children[1].innerHTML = parseInt(e.target.parentElement.children[1].innerHTML) - 1;
    }
    e.target.parentElement.children[0].style.color = 'silver';
}

function go_to_error_page() {
    if(document.getElementById("error-page") == null) {
        let error_element = document.createElement("div");
        error_element.id = "error-page";
        error_element.innerHTML = `The question page you are trying to visit does not exist`;
        document.body.appendChild(error_element);
    }
}