
function accept_answer_0(){
    if(document.getElementById("question-status").innerHTML=="[Ongoing]"){
       document.getElementById("question-status").innerHTML="[Solved]"
       document.getElementById("answer-accept-0").innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
       document.getElementById('accept-btn-1').style = "visibility: hidden;";
       document.getElementById('accept-btn-0').style = "visibility: hidden;";
    } 
}

function accept_answer_1(){
    if(document.getElementById("question-status").innerHTML=="[Ongoing]"){
       document.getElementById("question-status").innerHTML="[Solved]"
       document.getElementById("answer-accept-1").innerHTML = "~~  This Answer Has Been Accepted By The Asker  ~~" ;
       document.getElementById('accept-btn-0').style = "visibility: hidden;";
       document.getElementById('accept-btn-1').style = "visibility: hidden;";
    }
}
    
function rwd_change() {
    let old_reward = Number(document.getElementById("rwd_num").innerHTML);
    let new_reward = old_reward + Number(document.getElementById("offering_rwd").value);
    document.getElementById("new_reward").innerHTML = `New Reward: ${new_reward}`;
}


async function confirm_reward(){
    //TODO: pull data and verify if user has enough gold
    let old_reward = Number(document.getElementById("rwd_num").innerHTML);
    let new_reward = old_reward + Number(document.getElementById("offering_rwd").value);
    const increment = new_reward - old_reward;
    try{
        const get_user_res = await fetch(`/user/${self_profile.userID}`);
        const user_json = await get_user_res.json();     // json: user json
        if (user_json.gold < increment){        // not enough gold
            alert("Not Enough Gold!!!");
            throw "Not Enough Gold!!!";
        }
        // PATCH to update user's gold
        res = await fetch(`/user/${self_profile.userID}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "gold": user_json.gold - increment
            }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });
    }catch(err){
        console.log(err);
        return;
    } 
    // update DOM
    document.getElementById("rwd_num").innerHTML= new_reward;
    document.getElementById("offering_rwd").value = 0;
    document.getElementById("new_reward").innerHTML = `&nbsp;`;
    // PATCH to update question's reward
    try{
        // question id = ?x
    }catch(err){
        console.log(err);
    }
}

